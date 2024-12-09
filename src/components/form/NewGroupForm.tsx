import { useState, useEffect } from "react";
import FormLayout from "@components/ui/FormLayout";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import TextArea from "@components/ui/TextArea";
import FileInput from "@components/ui/FileInput";
import { checkAuthStatus } from "../../services/authServices";

interface Friend {
  id: number;
  name: string;
}

interface NewGroupFormProps {
  onClose: () => void;
}

export default function NewGroupForm({ onClose }: NewGroupFormProps) {
  const [formValues, setFormValues] = useState({
    groupname: "",
    description: "",
    groupimg: null as File | null,
    selectedFriends: [] as Friend[],
    searchTerm: "",
  });
  const [friends, setFriends] = useState<Friend[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null); // Track authenticated user's ID
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  useEffect(() => {
    const initialize = async () => {
      try {
        const user = await checkAuthStatus();
        if (!user) {
          setError("You must be logged in to create a group.");
          setLoading(false);
          return;
        }
        setUserID(user.id);
        await fetchFriends(user.id); // Fetch friends once userID is available
      } catch (err) {
        setError("Failed to authenticate. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, []);

  const fetchFriends = async (userID: string) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userID}/followers`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch friends.");
      }
      const data = await response.json();
      setFriends(data.friends || []);
    } catch (err) {
      setError("Unable to load friends.");
    }
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("groupname", formValues.groupname);
    formData.append("description", formValues.description);
    if (formValues.groupimg) {
      formData.append("groupimg", formValues.groupimg);
    }
    formValues.selectedFriends.forEach((friend) =>
      formData.append("selectedFriends[]", String(friend.id))
    );

    try {
      const response = await fetch("http://localhost:8000/groups", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to create group.");
      }

      console.log("Group created successfully!");
      onClose();
    } catch (err) {
      console.error("Error creating group:", err);
      setError("Failed to create group. Please try again.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormValues({ ...formValues, groupimg: file });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, searchTerm: event.target.value });
  };

  const handleSelectFriend = (friend: Friend) => {
    if (
      !formValues.selectedFriends.find(
        (selectedFriend) => selectedFriend.id === friend.id
      )
    ) {
      setFormValues((prev) => ({
        ...prev,
        selectedFriends: [...prev.selectedFriends, friend],
        searchTerm: "",
      }));
    }
  };

  const handleRemoveFriend = (friendId: number) => {
    setFormValues((prev) => ({
      ...prev,
      selectedFriends: prev.selectedFriends.filter(
        (friend) => friend.id !== friendId
      ),
    }));
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(formValues.searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <FormLayout
      title="Create A New Group"
      subtitle="Fill in the details below to create a new group"
      containerClassName="relative bg-purple-200 p-6 rounded-lg shadow-lg max-w-md w-full"
    >
      <form onSubmit={handleFormSubmit}>
        <Input
          label="Group Name"
          type="text"
          required
          id="groupname"
          name="groupname"
          placeholder="Enter group name"
          value={formValues.groupname}
          onChange={handleChange}
        />
        <TextArea
          label="Description"
          required
          id="description"
          name="description"
          placeholder="Describe your group"
          value={formValues.description}
          onChange={handleChange}
        />
        <FileInput
          label="Group Image (Optional)"
          type="file"
          id="groupimg"
          name="groupimg"
          accept="image/*"
          onChange={handleFileChange}
        />

        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Invite Friends (Optional)
          </label>
          <input
            type="text"
            placeholder="Search friends..."
            value={formValues.searchTerm}
            onChange={handleSearchChange}
            className="border rounded px-3 py-2 w-full"
          />
          <ul className="border rounded mt-2 max-h-24 overflow-y-auto">
            {filteredFriends.map((friend) => (
              <li
                key={friend.id}
                className="p-2 hover:bg-gray-400 cursor-pointer"
                onClick={() => handleSelectFriend(friend)}
              >
                {friend.name}
              </li>
            ))}
          </ul>
          <div className="mt-2">
            <p>Selected Friends:</p>
            <ul className="flex flex-wrap gap-2">
              {formValues.selectedFriends.map((friend) => (
                <li
                  key={friend.id}
                  className="bg-gray-200 text-blue-800 px-3 py-1 rounded-full cursor-pointer"
                  onClick={() => handleRemoveFriend(friend.id)}
                >
                  {friend.name} <span className="ml-2 text-red-500">x</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end gap-4 mt-4">
          <Button
            type="button"
            className="bg-gray-400 text-gray-900 hover:text-white hover:bg-gray-600 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" className="Vibrant_button px-4 py-2 rounded">
            Create
          </Button>
        </div>
      </form>
    </FormLayout>
  );
}
