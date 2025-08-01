import React, { useEffect, useState } from "react";

import { auth } from "../wrapper/authWrapper.tsx";

const OnlineUsers = (props: {
  setIsSideBarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showOnlineOnly, setShowOnlineOnly] = useState<boolean>(false);
  const {
    onlineUsers,
    selectedUser,
    setSelectedUser,
    selectedUserRef,
    allUsers,
    getAllMessagesForSelectedUser,
  } = auth();
  const [filteredUsers, setFilteredUsers] = useState<[]>([]);
  useEffect(() => {
    setFilteredUsers(allUsers);
    const filteringUsers = () => {
      if (showOnlineOnly) {
        const temp = allUsers.filter((user: any) => {
          if (onlineUsers?.includes(user?._id)) {
            return user;
          }
        });
        setFilteredUsers(temp);
      } else {
        setFilteredUsers(allUsers);
      }
    };

    filteringUsers();

    console.log("The temp is: ", filteredUsers);
  }, [showOnlineOnly, allUsers]);





  return (
    <>
      <aside className="h-full w-full lg:w-[26vw] not-max-[769px]:border-r border-base-300 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-5">
          <div className="flex items-center gap-2">
            {/* <Users className="size-6" /> */}
            <span className="font-medium block">Contacts</span>
          </div>
          {/* Online filter toggle */}
          <div className="mt-3 flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-sm"
              />
              <span className="text-sm">Show online only</span>
            </label>
            <span className="text-xs text-zinc-500">
              ({onlineUsers.length - 1} online)
            </span>
          </div>
        </div>

        <div className="overflow-y-auto w-full py-3">
          {filteredUsers.map(
            (user: {
              _id: string;
              name: string;
              email: string;
              profilepic: string;
              updatedAt: string;
              preferences: [];
            }) => (
              <button
                key={user._id}
                onClick={() => {
                  props.setIsSideBarVisible(false);
                  setSelectedUser(user);
                  selectedUserRef.current = user;
                  console.log("Just updated selectedUserRef: ", selectedUserRef.current)
                  getAllMessagesForSelectedUser(`${user?._id}`);
                }}
                className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              
              ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}
              >
                <div className="relative lg:mx-0">
                  <img
                    src={
                      user.profilepic ||
                      "https://t4.ftcdn.net/jpg/05/89/93/27/240_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
                    }
                    alt={user.name}
                    className="size-12 object-cover rounded-full"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span
                      className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                    />
                  )}
                </div>

                {/* User info - only visible on larger screens */}
                <div className="text-left min-w-0">
                  <div className="font-medium truncate">{user.name}</div>
                  <div className="text-sm text-zinc-400">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
              </button>
            )
          )}

          {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
          {/* */}
        </div>
      </aside>
    </>
  );
};

export default OnlineUsers;
