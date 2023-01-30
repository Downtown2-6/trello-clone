import React from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from "react";
import events from "./TestEvents";

export const MyCalendar = () => {


  return (
    <div>
      <FullCalendar
        headerToolbar={{
          start: "today prev next",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        plugins={[daygridPlugin, interactionPlugin]}
        editable
        selectable
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        height={"80vh"}
        events={events}
      />
      ;
    </div>
  );
};
