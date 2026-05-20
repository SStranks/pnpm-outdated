import * as core from '@actions/core';
import { diff } from 'semver';

type SemverVersion = 'Major' | 'Minor' | 'Patch';

type SummaryTableRow = (SummaryTableCell | string)[];
interface SummaryTableCell {
  data: string;
  header?: boolean;
  colspan?: string;
  rowspan?: string;
}

interface PnpmRecursiveOutdated {
  current: string;
  latest: string;
  wanted: string;
  isDeprecated: boolean;
  dependencyType: string;
  dependentPackages: { name: string; location: string }[];
}

const EMPTYROW_15PX = '<tr style="height: 15px"></tr>';
const EMPTYROW_5PX = '<tr style="height: 5px"></tr>';
const TABLE_HEADERS = `<th style="text-align: left">Package</th>
  <th style="text-align: left">Current</th>
  <th style="text-align: left">Latest</th>
  <th style="text-align: left">Dependents</th>`;
const tableHeader = (semverVersion: SemverVersion) => `<th style="text-align: left" colspan="4">${semverVersion}</th>`;

const semverHTMLTable = (data: SummaryTableRow[] | [], tableVersion: SemverVersion) => {
  if (data.length === 0) return '';

  const tableData = data
    .map((row: SummaryTableRow) => {
      const cells = row
        .map((cell) => {
          if (typeof cell === 'string') {
            return `<td>${cell}</td>`;
          }

          const tag = cell.header ? 'th' : 'td';

          const colspan = cell.colspan ? ` colspan="${cell.colspan}"` : '';
          const rowspan = cell.rowspan ? ` rowspan="${cell.rowspan}"` : '';

          return `<${tag}${colspan}${rowspan}>${cell.data}</${tag}>`;
        })
        .join('');

      return `<tr>${cells}</tr>`;
    })
    .join('');

  return `${tableHeader(tableVersion)}${EMPTYROW_5PX}${TABLE_HEADERS}${tableData}${EMPTYROW_15PX}`;
};

export const markdownTableFormatter = (
  major: SummaryTableRow[] | [],
  minor: SummaryTableRow[] | [],
  patch: SummaryTableRow[] | []
) => {
  const tableTitle = '<th style="text-align: center" colspan="4">Outdated Packages</th>';

  const tableMajor = semverHTMLTable(major, 'Major');
  const tableMinor = semverHTMLTable(minor, 'Minor');
  const tablePatch = semverHTMLTable(patch, 'Patch');

  return `<table>${tableTitle}${EMPTYROW_15PX}${tableMajor}${tableMinor}${tablePatch}</table>`;
};

export const summaryNoOutdated = () => {
  core.summary.addHeading('All dependencies are current');
  void core.summary.write();
};

export const summaryOutdated = (input: string) => {
  const majorTableRows: SummaryTableRow[] = [];
  const minorTableRows: SummaryTableRow[] = [];
  const patchTableRows: SummaryTableRow[] = [];

  const json = JSON.parse(input) as Record<string, PnpmRecursiveOutdated>;

  // Parse PNPM json;
  const jsonEntries = Object.entries(json);
  jsonEntries.forEach(([name, data]) => {
    const semverDiff = diff(data.current, data.latest);

    let deprecated;
    if (data['isDeprecated']) deprecated = 'Deprecated';
    const dependentPackages = data['dependentPackages']
      .map(({ name }) => name)
      .join('<br>')
      .trim();

    // Output table row cells per package
    const tableRow = [name, data.current, deprecated ?? data.latest, dependentPackages];

    if (semverDiff === 'major' || semverDiff === 'premajor') majorTableRows.push(tableRow);
    if (semverDiff === 'minor' || semverDiff === 'preminor') minorTableRows.push(tableRow);
    if (semverDiff === 'patch' || semverDiff === 'prepatch') patchTableRows.push(tableRow);
  });

  // From sorted by semver level, to markdown table
  const tableMarkdown = markdownTableFormatter(majorTableRows, minorTableRows, patchTableRows);

  // Export to github summary
  core.summary.addRaw(tableMarkdown);
  void core.summary.write();

  // Log a notice of package totals
  const majorTotal = `Major: ${majorTableRows.length}.`;
  const minorTotal = `Minor: ${minorTableRows.length}.`;
  const patchTotal = `Patch: ${patchTableRows.length}.`;
  core.notice(`Outdated Packages: ${majorTotal} ${minorTotal} ${patchTotal}`);
};
