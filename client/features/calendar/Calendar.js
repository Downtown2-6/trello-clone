import React from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

export const MyCalendar = () => {
  return (
    <div>
      <FullCalendar
        headerToolbar={{
          start: "today prev next",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        plugins={[daygridPlugin]}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        height={"90vh"}
      />
      ;
    </div>
  );
};
