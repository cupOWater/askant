import React, { useState } from 'react';
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import Unauthorized from './Unauthorized';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import "../assets/styles/Post.css";
import 'react-quill/dist/quill.snow.css';
import { postService } from '../service/postService';
import { useNavigate } from 'react-router-dom';

Quill.register('modules/imageUploader', ImageUploader);
const modules = {
    toolbar: {
        container: [
            [{ 'header': [1, 2, 3, 4, false] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ]
    },
    clipboard: {
        matchVisual: false,
    },
    imageUploader: {
        upload: (file) => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append("file", file);
                fetch(
                    "http://localhost:2222/image/upload",
                    {
                        method: "POST",
                        body: formData
                    }
                )
                    .then(response => response.json())
                    .then(result => {
                        console.log(result);
                        resolve(result.url);
                    })
                    .catch(error => {
                        reject("Upload failed");
                        console.error("Error:", error);
                    });
            });
        },
    }
};

function Post({ user }) {
    // all required variables for Post object
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("General");
    const navigate = useNavigate()

    const handleTitleChange = (e) => {
        setTitle(e.currentTarget.value);
    };

    const handleCategoryChange = (option) => {
        setCategory(option);
    };

    const handleSubmit = async () => {
        if (title.trim() === "" || category.trim() === "" || content.trim() === "") {
            window.alert("Please fill in all the fields");
        } else {
            const res = await postService.createPost({ title: title, category: category, content: content });
            if(res.status === 201){
                navigate("/");
                alert("Post created successfully");
            }
        }
    };


    if (user === undefined) { // not logged in
        return <Unauthorized />
    } else {
        const isAdmin = user.type === 'admin';
        const isVerified = user.isVerified === 'true';
        return (
            <>
                <div className='post-container'>
                    <form>
                        <div style={{ margin: "0 auto" }}>
                            <div className='title-container'>
                                <label className="title" style={{ marginRight: "10px" }}>Title</label>
                                <input id="title" type="text" onChange={handleTitleChange} style={{ marginRight: "30px", width: "350px" }} required />
                                <label className="category" style={{ marginRight: "10px" }}>Category</label>
                                <select className="btn btn-secondary dropdown-toggle" value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
                                    <option value="General">General</option>
                                    <option value="QnA">QnA</option>
                                    {isAdmin && <option value="Announcement">Announcement</option>}
                                    {isVerified && <option value="Trade">Trade</option>}
                                </select>
                            </div>
                            <ReactQuill
                                theme='snow'
                                style={{ width: "800px", height: "600px" }}
                                modules={modules}
                                onChange={setContent}
                            />
                        </div>
                    </form>
                    <button className="btn btn-warning btn-rounded post-button" onClick={handleSubmit}>Post</button>
                </div>

            </>
        );
    }
}

export default Post;