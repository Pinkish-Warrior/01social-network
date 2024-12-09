import { useState } from "react";
import FormLayout from "@components/ui/FormLayout";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import TextArea from "@components/ui/TextArea";

interface NewEventFormProps {
  onClose: () => void;
}

export default function NewEventForm({ onClose }: NewEventFormProps) {
  const [formValues, setFormValues] = useState({
    eventTitle: "",
    description: "",
    datetime: "",
    location: "",
  });

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("New event created!", formValues);
    onClose();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <FormLayout
      title="Create A New Event"
      subtitle="Fill in the details below to create a new event"
      containerClassName="relative bg-purple-200 p-6 rounded-lg shadow-lg max-w-md w-full"
    >
      <form onSubmit={handleFormSubmit}>
        <Input
          label="Event Title"
          type="text"
          required
          id="eventTitle"
          name="eventTitle"
          placeholder="Enter event title"
          value={formValues.eventTitle}
          onChange={handleChange}
        />
        <TextArea
          label="Description"
          required
          id="description"
          name="description"
          placeholder="Describe your event"
          value={formValues.description}
          onChange={handleChange}
        />
        <Input
          label="Date and Time"
          type="datetime-local"
          required
          id="datetime"
          name="datetime"
          value={formValues.datetime}
          onChange={handleChange}
        />
        <Input
          label="Location"
          type="text"
          required
          id="location"
          name="location"
          placeholder="Enter event location"
          value={formValues.location}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-4 mt-4">
          <Button
            type="button"
            className="bg-gray-400 text-gray-900 hover:text-white hover:bg-gray-600 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" className="Vibrant_button px-4 py-2 rounded">
            Create Event
          </Button>
        </div>
      </form>
    </FormLayout>
  );
}
