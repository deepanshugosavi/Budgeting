import React from "react";
import "./css/user.css";
import { MdCamera } from "react-icons/md";

function User(props) {
  return (
    <div className="user__container">
      <div className="user_main_container">
        <div className="user_profile_container">
          <div className="user_profile_image_card">
            <img
              src="https://avatars1.githubusercontent.com/u/64830917?s=460&u=52fa62a523515620af102c282b4a90d17efef298&v=4"
              alt=""
              className="user_profile_image"
            />
            <MdCamera className="user_image_camera_icon" size="40px" />
          </div>
          <div className="user_full_name">Deepanshu Gosavi⭐</div>
          <div className="user_username">@deepanshugosavi</div>
          <div className="user_familyId">FamilyID: @gosavi_0129</div>
        </div>
        <div className="user_details_container">
          <div className="user_transaction_details">
            <div className="user_transaction_number">
              <div>Total Transaction:</div>
              <span>#20</span>
            </div>
            <div className="user_transaction_total_amount">
              <div>Total Transaction Amount: </div>
              <span> Rs. 1028.00/- </span>
            </div>
          </div>
          <div className="user_family_members">
            <div className="user_family_member_heading">Family Members:</div>
            <div className="user_family_member_cards">
              <div className="user_family_member_card">
                <img
                  src="https://img.favpng.com/2/24/0/computer-icons-avatar-user-profile-png-favpng-HPjiNes3x112h0jw38sbfpDY9.jpg"
                  alt=""
                  className="user_family_member_image"
                />
                <div className="user_family_member_username">
                  @deepanshugosavi
                </div>
              </div>
              <div className="user_family_member_card">
                <img
                  src="https://img.favpng.com/2/24/0/computer-icons-avatar-user-profile-png-favpng-HPjiNes3x112h0jw38sbfpDY9.jpg"
                  alt=""
                  className="user_family_member_image"
                />
                <div className="user_family_member_username">
                  @deepanshugosavi
                </div>
              </div>
              <div className="user_family_member_card">
                <img
                  src="https://img.favpng.com/2/24/0/computer-icons-avatar-user-profile-png-favpng-HPjiNes3x112h0jw38sbfpDY9.jpg"
                  alt=""
                  className="user_family_member_image"
                />
                <div className="user_family_member_username">
                  @deepanshugosavi
                </div>
              </div>
              <div className="user_family_member_card">
                <img
                  src="https://avatars1.githubusercontent.com/u/64830917?s=460&u=52fa62a523515620af102c282b4a90d17efef298&v=4"
                  alt=""
                  className="user_family_member_image"
                />
                <div className="user_family_member_username">
                  @deepanshugosavi
                </div>
              </div>
              <div className="user_family_member_card">
                <img
                  src="https://avatars1.githubusercontent.com/u/64830917?s=460&u=52fa62a523515620af102c282b4a90d17efef298&v=4"
                  alt=""
                  className="user_family_member_image"
                />
                <div className="user_family_member_username">
                  @deepanshugosavi
                </div>
              </div>
              <div className="user_family_member_card">
                <img
                  src="https://avatars1.githubusercontent.com/u/64830917?s=460&u=52fa62a523515620af102c282b4a90d17efef298&v=4"
                  alt=""
                  className="user_family_member_image"
                />
                <div className="user_family_member_username">
                  @deepanshugosavi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
