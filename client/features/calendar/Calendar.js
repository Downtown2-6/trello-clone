import React from "react";
import FullCalendar from "fullcalendar-reactwrapper";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
  }

  componentDidMount() {
    // fetch events from the backend and set them in the state
    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ events: data });
      });
  }

  render() {
    return (
      <FullCalendar
        events={this.state.events}
        header={{
          left: "prev,next today",
          center: "title",
          right: "month,agendaWeek,agendaDay",
        }}
        defaultView="month"
        navLinks={true}
        editable={true}
        eventLimit={true}
        selectable={true}
        selectHelper={true}
        select={this.handleSelect}
        eventClick={this.handleEventClick}
      />
    );
  }
}
