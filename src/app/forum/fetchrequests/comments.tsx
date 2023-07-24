import { NextRequest } from "next/server";
import { toast } from "react-toastify";

export async function createComment(req: any) {
  const body = {
    commentBody: req.target.parentElement.firstChild.value,
    postId: req.target.parentElement.parentElement.id,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };

  let test = await fetch("/api/forum/comments", options)
    .then(function (response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      // return response.json();
    })
    .then(function (data) {
      toast.success("🦄 Comment created!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // `data` is the parsed version of the JSON returned from the above endpoint.
      console.log(data);
    });
  console.log(test);
}

export async function handleCommentDelete(
  commentId: string,
  commentPosterId: string,
) {
  const urlParams = new URLSearchParams();
  console.log();

  urlParams.append("commentId", commentId);
  urlParams.append("commentPosterId", commentPosterId);

  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  let test = await fetch(`/api/forum/comments?${urlParams}`, options)
    .then(function (response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    })
    .then(function (data) {
      toast.success("Comment Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // `data` is the parsed version of the JSON returned from the above endpoint.
      console.log(data);
    });
  console.log(test);
  console.log("deleted");
}

export async function handleEdit(
  commentText: string,
  commentId: string,
  commentPosterId: string,
) {
  const urlParams = new URLSearchParams();
  console.log();

  urlParams.append("postText", commentText);
  urlParams.append("postId", commentId);
  urlParams.append("commentPosterId", commentPosterId);

  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  };
  let test = await fetch(`/api/forum/comments?${urlParams}`, options)
    .then(function (response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    })
    .then(function (data) {
      toast.success("🦄 Post Edited!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // `data` is the parsed version of the JSON returned from the above endpoint.
      console.log(data);
    });
  console.log(test);
}
