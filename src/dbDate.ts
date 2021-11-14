export function fromStr(str : string) {
    // in pst
    return new Date(str.slice(0, 2) + "-" + str.slice(2, 4) + "-" + str.slice(4, 8));    
}

export function toStr(date : Date) {
    // in format mmddyyyy and time in pst
    return date.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric"
    }).replace(/\//g, "");
}