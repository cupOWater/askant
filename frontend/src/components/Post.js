import React, { useState, useEffect } from 'react';
import ReactQuill from "react-quill";
import "../assets/styles/Post.css";
import 'react-quill/dist/quill.snow.css';
import Unauthorized from './Unauthorized';

function Post({ user }) {
    // all required variables for Post object
    const [title, setTitle] = useState("");
    const [userID, setUserID] = useState(""); // retrieve from logged in user
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [comment, setComment] = useState([]); // always empty when it is posted at first

    // image convert process with Multer
    // const imageHandler = () => {
    //     const input = document.createElement('input');

    //     input.setAttribute('type', 'file');
    //     input.setAttribute('accept', 'image/*');
    //     input.click();
    
    //     input.addEventListener('change', async () => {
    //         const file = input.files[0];
    //         // create date which is fitted on Multer
    //         const formData = new FormData();
    //         formData.append('img', file); // formData is key - value
    //         // send image data to Multer router on backend
    //         try {
    //             const result = await axios.post('http://localhost:4050/img', formData);
    //             const IMG_URL = result.data.url;

    //             const editor = quillRef.current.getEditor();

    //             const range = editor.getSelection();

    //             editor.insertEmbed(range.index, 'image', IMG_URL);
    //         } catch (error) {
    //             console.log('Fail to upload image.');
    //         }
    //     });
    // };

    const modules = {
        toolbar: {
            container: [
                ["image"],
                [{ header: [1, 2, 3, 4, 5, false] }],
                [{list:'ordered'}],
                ["bold", "italic", "underline", "strike"],
            ],
            // handler: { // make it active when you are done with backend work; multer!
            //     image: imageHandler
            // }
        },
    };

    const handleTitleChange = (e) => {
        setTitle(e.currentTarget.value);
    };

    const handleCategoryChange = (option) => {
        setCategory(option);
      };

    const handleSubmit = async () => {
        // api for backend; to save post on mongodb
    };

    if(user === undefined) { // not logged in
        return <Unauthorized />
    } else {
        const isAdmin = user.type === 'admin';

        return (
            <>
                <div className='post-container'>
                    <div style={{margin: "0 auto"}}>
                        <div className='title-container'>
                            <label className="title" style={{ marginRight: "10px" }}>Title</label>
                            <input id="title" type="text" onChange={handleTitleChange} style={{ marginRight: "30px", width: "350px" }}/>
                            <label className="category" style={{ marginRight: "10px" }}>Category</label>
                            <select className="btn btn-secondary dropdown-toggle" value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
                                {isAdmin && <option value="Announcement">Announcement</option>}
                                <option value="Q&A">Q&A</option>
                                <option value="Free">Free</option>
                                <option value="Trade">Trade</option>
                        </select>
                        </div>
                    <ReactQuill
                        theme='snow'
                        style={{ width: "800px", height: "600px" }}
                        modules={modules}
                        onChange={setContent}
                    />
                    </div>
                    <button className="btn btn-warning btn-rounded post-button" onClick={handleSubmit}>Post</button>
                </div>
                
            </>
        );
    }
}

export default Post;