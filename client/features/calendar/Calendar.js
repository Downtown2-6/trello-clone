import React from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import TaskCardModal from "../taskCards/TaskCardModal";
import { Modal, Box } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  bgcolor: 'gainsboro',
  outline: 'none',
  borderRadius: 0.5,
  boxshadow: 24,
};

export const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const  boardId = useSelector((state) => state.singleBoard.id);

  const getEvents = async () => await axios.get(`/api/tasks/${boardId}`);

  useEffect(() => {
    getEvents().then((res) => {
      setEvents(res.data);
    });
  }, []);

  console.log("These are the events on calendar", events)

  const updateEvent = async ({ event }) => {
    console.log("This is updateEvent", event);
    console.log("This is updateEvent event start", event.start);
    axios.put(`/api/tasks/${boardId}/${event.id}`, {
      start: event.start,
    });
  };

  const [open, setOpen] = useState(false);
  const [taskCard, setTaskCard] = useState(null)
  const list = {name: "listNameNotOnCalendar"}


  // Feature to add eventClick that will open a TaskCardModal was in progress
  // The eventClick is currently commented out so the functionality is not there
  // To complete functionality, we will need to bring in the correct data from the database (list and taskcard)
  // Also, any changes will need to be dispatched the same way that the TaskCardModal on the SingleBoard is.
  // That way other users viewing SingleBoard will get the updates.

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleEventClick = (event) => {
    setOpen(true)
    setTaskCard(event)
    console.log("this is the event in calendar handleClickEvent", event)
  }

  return (
    <div>
      <br/>
      <FullCalendar
        headerToolbar={{
          start: "today prev next",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        plugins={[daygridPlugin, interactionPlugin]}
        selectable
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        height={"80vh"}
        events={events}
        editable={true}
        eventResizableFromStart={true}
        eventDrop={updateEvent}
        // eventClick={(event) => handleEventClick(event)}
      />
            <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='taskCard-modal-title'
      aria-describedby='taskCard-modal-description'
    >
      <Box sx={{ ...style, width: '90vw', maxHeight: '90vh', height: '90vh', overflowY: 'auto', padding: 2 }}>
        <TaskCardModal list={list} taskCard={event} style={style} />
      </Box>
    </Modal>
    </div>
  );
};
