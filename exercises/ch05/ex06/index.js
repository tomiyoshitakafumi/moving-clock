try {
    console.log("try");
    throw new Error();
} catch {
    console.log("catch");
} finally {
    console.log("finally");
}