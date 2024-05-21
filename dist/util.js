const EMPTYROW_15PX = '<tr style="height: 15px"></tr>';
const EMPTYROW_5PX = '<tr style="height: 5px"></tr>';
const TABLE_HEADERS = '<th style="text-align: left">Package</th><th style="text-align: left">Current</th><th style="text-align: left">Latest</th><th style="text-align: left">Dependents</th>';
const tableHeader = (semverVersion) => `<th style="text-align: left" colspan="4">${semverVersion}</th>`;
const semverHTMLTable = (data, tableVersion) => {
    if (data.length === 0)
        return '';
    const tableData = data
        .map((row) => {
        const cells = row.map((cell) => `<td>${cell}</td>`).join('');
        return `<tr>${cells}</tr>`;
    })
        .join('');
    return `${tableHeader(tableVersion)}${EMPTYROW_5PX}${TABLE_HEADERS}${tableData}${EMPTYROW_15PX}`;
};
export const markdownTableFormatter = (major, minor, patch) => {
    const tableTitle = '<th style="text-align: center" colspan="4">Outdated Packages</th>';
    const tableMajor = semverHTMLTable(major, 'Major');
    const tableMinor = semverHTMLTable(minor, 'Minor');
    const tablePatch = semverHTMLTable(patch, 'Patch');
    return `<table>${tableTitle}${EMPTYROW_15PX}${tableMajor}${tableMinor}${tablePatch}</table>`;
};
