// CRUD cho comments
async function LoadComments() {
    try {
        let res = await fetch('http://localhost:3000/comments');
        let comments = await res.json();
        let body = document.getElementById("comments-body");
        body.innerHTML = "";
        for (const cmt of comments) {
            if (cmt.isDeleted) {
                body.innerHTML += `<tr>
                    <td><s>${cmt.id}</s></td>
                    <td><s>${cmt.text}</s></td>
                    <td><s>${cmt.postId}</s></td>
                    <td><input type='submit' value='delete' onclick='DeleteComment(${cmt.id})' disabled/></td>
                </tr>`;
            } else {
                body.innerHTML += `<tr>
                    <td>${cmt.id}</td>
                    <td>${cmt.text}</td>
                    <td>${cmt.postId}</td>
                    <td><input type='submit' value='delete' onclick='DeleteComment(${cmt.id})'/></td>
                </tr>`;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function SaveComment() {
    let id = document.getElementById("comment_id_txt").value;
    let text = document.getElementById("comment_text_txt").value;
    let postId = document.getElementById("comment_postId_txt").value;
    if (id) {
        // Edit
        let getItem = await fetch("http://localhost:3000/comments/" + id);
        if (getItem.ok) {
            let res = await fetch('http://localhost:3000/comments/' + id,
                {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ text: text, postId: postId })
                })
            if (res.ok) {
                console.log("edit comment thanh cong");
            }
        }
    } else {
        // Tạo mới
        let resCmts = await fetch('http://localhost:3000/comments');
        let comments = await resCmts.json();
        let maxId = Math.max(...comments.map(c => parseInt(c.id || "0")));
        let newId = (maxId + 1).toString();
        let res = await fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: newId, text: text, postId: postId })
        });
        if (res.ok) {
            console.log("them comment thanh cong");
        }
    }
    LoadComments();
}

async function DeleteComment(id) {
    let res = await fetch('http://localhost:3000/comments/' + id, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ isDeleted: true })
    });
    if (res.ok) {
        console.log("xoa mem comment thanh cong");
    }
    LoadComments();
}

// Gọi LoadComments khi cần
//HTTP request get,get/id,post,put/id, delete/id
async function LoadData() {
    try {
        let res = await fetch('http://localhost:3000/posts');
        let posts = await res.json()
        let body = document.getElementById("table-body");
        body.innerHTML = "";
        for (const post of posts) {
            if (post.isDeleted) {
                body.innerHTML += `<tr>
                    <td><s>${post.id}</s></td>
                    <td><s>${post.title}</s></td>
                    <td><s>${post.views}</s></td>
                    <td><input type='submit' value='delete' onclick='Delete(${post.id})' disabled/></td>
                </tr>`
            } else {
                body.innerHTML += `<tr>
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                    <td>${post.views}</td>
                    <td><input type='submit' value='delete' onclick='Delete(${post.id})'/></td>
                </tr>`
            }
        }
        return false;
    } catch (error) {
        console.log(error);
    }

}//
async function Save() {
    let id = document.getElementById("id_txt").value;
    let title = document.getElementById("title_txt").value;
    let views = document.getElementById("view_txt").value;
    if (id) {
        // Edit
        let getItem = await fetch("http://localhost:3000/posts/" + id);
        if (getItem.ok) {
            let res = await fetch('http://localhost:3000/posts/' + id,
                {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ title: title, views: views })
                })
            if (res.ok) {
                console.log("edit du lieu thanh cong");
            }
        }
    } else {
        // Tạo mới
        let resPosts = await fetch('http://localhost:3000/posts');
        let posts = await resPosts.json();
        let maxId = Math.max(...posts.map(p => parseInt(p.id || "0")));
        let newId = (maxId + 1).toString();
        let res = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: newId, title: title, views: views })
        });
        if (res.ok) {
            console.log("them du lieu thanh cong");
        }
    }
    LoadData();

}
async function Delete(id) {
    let res = await fetch('http://localhost:3000/posts/' + id, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ isDeleted: true })
    });
    if (res.ok) {
        console.log("xoa mem thanh cong");
    }
    LoadData();
}
LoadData();