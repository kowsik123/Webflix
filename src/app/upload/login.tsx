import uploadAPI from "./uploadAPI";

export const login = (callback: (adminAccessId: string) => void) => {
    const localAccessId = localStorage.getItem("admin-access-id");
    if (localAccessId) {
        callback(localAccessId);
    } else {
        const id = prompt("Enter Admin Access Id");
        if (id == null) return;
        uploadAPI.post('login', { adminAccessId: id }, (data: any) => {
            if (data.login == "success") {
                localStorage.setItem("admin-access-id", id);
                callback(id);
            } else {
                alert("Invalid Id: " + id);
            }
        });
    }
};
