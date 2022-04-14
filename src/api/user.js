/* Function plays role of api call*/
function userApi(id) {
    // todo: delete later
    console.log("User api");
    const responce = {
        id,
        name: "Alex Fowler",
        position: "Engineering manager",
    };
    return new Promise((resolve) => {
        setTimeout(
            () => resolve(responce),
            2000,
        );
    });
}

/* Wrapper for using in components */
export async function getUser(id) {
    const result = await userApi(id);
    return result;
}