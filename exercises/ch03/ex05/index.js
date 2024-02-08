export function replaceLFtoCRLF(x) {
    return x.replace("\n", "\r\n");
}

export function replaceCRLFtoLF(x) {
    return x.replace("\r\n", "\n");
}