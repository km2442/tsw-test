import firebase from "../../firebase/init";
/* eslint-disable no-console */
export const qedit = {
    data() {
        return {
            Question: "",
            Ans1: "",
            Ans2: "",
            Ans3: "",
            Ans4: "",
            GoodAns: [false, false, false, false],
            Textarea: "",
            Image: "",
            selectedFile: "",
            uploadState: 0,
            formState: false,
            rules: {
                required: value => !!value || "Pole wymagane"
            }
        };
    },
    methods: {
        prepareTextArea(text) {
            return text.split("\\n");
        },
        clearAddForm() {
            this.Question = "";
            this.Ans1 = "";
            this.Ans2 = "";
            this.Ans3 = "";
            this.Ans4 = "";
            this.GoodAns = [false, false, false, false];
            this.Textarea = "";
            this.Image = "";
            this.selectedFile = "";
            this.uploadState = 0;
        },
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        },
        uploadImage() {
            let storage = firebase.storage();
            let img = String(Date.now()) + "_" + this.selectedFile.name;
            let task = storage.ref("images/" + img).put(this.selectedFile);
            let vm = this;
            task.on(
                "state_changed",
                function (snapshot) {
                    let precentage =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    vm.uploadState = precentage;
                },
                function error(e) {
                    throw console.error(e);
                },
                function () {
                    task.snapshot.ref.getDownloadURL().then(downloadURL => {
                        vm.Image = downloadURL;
                    });
                }
            );
        },
        acceptQuestion() {
            this.$emit("acceptQuestion", {
                Question: this.Question,
                Ans1: this.Ans1,
                Ans2: this.Ans2,
                Ans3: this.Ans3,
                Ans4: this.Ans4,
                GoodAns: this.GoodAns,
                Textarea: this.Textarea,
                Image: this.Image,
            });
        },
        cancelEdit() {
            this.$router.push({ name: "Admin" });
        }
    },
}