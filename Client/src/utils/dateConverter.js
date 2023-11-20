function dateConverter(date) {
    const newDate = new Date(date);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const formattedDate = newDate.toLocaleDateString("en-US", options);
    return formattedDate;
}
export default dateConverter