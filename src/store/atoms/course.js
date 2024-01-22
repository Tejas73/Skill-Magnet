import { atom } from "recoil";

export const courseState = atom({
    key: "courseState",
    default: {
        isLoading: true,
        course: { title: "", description: "", imageLink: "", price: "" }
    },
})