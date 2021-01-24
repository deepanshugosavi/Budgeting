import React, { useEffect, useRef, useState } from "react";
import "./css/user.css";
import { MdCamera } from "react-icons/md";
import axios from "axios";
import Loading from "../Loading";

function User(props) {
  const inputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [family, setFamily] = useState([]);
  useEffect(() => {
    setUser("loading");
    axios
      .get(
        `http://127.0.0.1:8000/get_user_profile?userName=${localStorage.getItem(
          "user_name"
        )}&userPassword=${localStorage.getItem("user_hash")}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data["result"] !== null) {
          setUser(res.data["result"]["user_data"]);
          setFamily(res.data["result"]["member_data"]);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const picUploaderHanlder = (event) => {
    const imageFile = event.target.files[0];
    let filename = imageFile.name;
    let fileExtension =
      filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
      filename;

    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|jfif)$/)) {
      alert("Please select valid image.");
      return false;
    }
    const fd = new FormData();
    fd.append(
      "file",
      imageFile,
      localStorage.getItem("user_name") + "." + fileExtension
    );
    setUser("loading");
    axios
      .post("http://127.0.0.1:8000/profile_image", fd)
      .then((res) => {
        console.log(res.data);
        if (res.data["result"] === "success") {
          localStorage.setItem("image_url", res.data["image_url"]);
        }
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
        window.location.reload();
      });
  };

  if (user === "loading") return <Loading />;
  if (user !== null)
    return (
      <div className="user__container">
        <input
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          onChange={picUploaderHanlder}
        />
        <div className="user_main_container">
          <div className="user_profile_container">
            <div className="user_profile_image_card">
              <img
                src={
                  user["image_url"] === ""
                    ? "https://img.favpng.com/2/24/0/computer-icons-avatar-user-profile-png-favpng-HPjiNes3x112h0jw38sbfpDY9.jpg"
                    : user["image_url"]
                }
                alt=""
                className="user_profile_image"
              />
              <MdCamera
                className="user_image_camera_icon"
                size="40px"
                onClick={() => {
                  inputRef.current.click();
                }}
              />
            </div>
            <div className="user_full_name">{user["full_name"]}⭐</div>
            <div className="user_username">@{user["user_name"]}</div>
            <div className="user_familyId">
              FamilyID: @{user["user_family_name"]}
            </div>
          </div>
          <div className="user_details_container">
            <div className="user_transaction_details">
              <div className="user_transaction_number">
                <div>Total Transaction:</div>
                <span>#{user["user_transaction_count"]}</span>
              </div>
              <div className="user_transaction_total_amount">
                <div>Total Transaction Amount: </div>
                <span> Rs. {user["user_transaction_total_amount"]}/- </span>
              </div>
            </div>
            <div className="user_family_members">
              <div className="user_family_member_heading">Family Members:</div>
              <div className="user_family_member_cards">
                {family.map((v, i) => {
                  return (
                    <div className="user_family_member_card">
                      <img
                        src={
                          v["member_image"] === ""
                            ? "https://img.favpng.com/2/24/0/computer-icons-avatar-user-profile-png-favpng-HPjiNes3x112h0jw38sbfpDY9.jpg"
                            : v["member_image"]
                        }
                        alt=""
                        className="user_family_member_image"
                      />
                      <div className="user_family_member_username">
                        @{v["member_username"]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return <div></div>;
}

export default User;
