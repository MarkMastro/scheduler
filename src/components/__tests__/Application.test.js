import axios from "axios";
import React from "react";

import { render, cleanup, waitForElement, queryByText, fireEvent, getByText, getByPlaceholderText, getAllByTestId, getByAltText, prettyDOM, getByTestId  } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

    
    await waitForElement(() => getByText("Monday"))

    fireEvent.click(getByText("Tuesday"))

    expect(getByText("Leopold Silvers")).toBeInTheDocument()
    
});

it("loads data, books an interview and reduces the spots remaining for the first day by 1", async ()=>{
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const articles = getAllByTestId(container, "appointment")

  const article = articles[0];

  const addButton = getByAltText(article, "Add")

  fireEvent.click(addButton)

  fireEvent.change(getByPlaceholderText( article,"Enter Student Name"), {
    target: { value: "Lydia Miller-Jones" }
  });

  const interviewer = getByAltText(article, "Sylvia Palmer");

  fireEvent.click(interviewer);

  const saveButton = getByText(article,"Save");

  fireEvent.click(saveButton);

  expect(getByText(article, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(article, "Sylvia Palmer"));

  const dayList = getAllByTestId(container,"day")

  const day = dayList.find(day =>
    queryByText(day, "Monday")//query by used because we need it turn return null when doesnt find and keep looking
  );
  expect(getByText(day, "no spots remaining")).toBeInTheDocument
  


})

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async ()=>{
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const articles = getAllByTestId(container, "appointment")

  const article = articles.find(day =>
    queryByText(day, "Archie Cohen")//query by used because we need it turn return null when doesnt find and keep looking
  );

  const deleteButton = getByAltText(article, "Delete")

  fireEvent.click(deleteButton);

  expect(getByText(article,"Are you sure you would like to delete?")).toBeInTheDocument();

  fireEvent.click(getByText(container,"Confirm"))

  expect(getByText(article, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByAltText(article, "Add"));

  const dayList = getAllByTestId(container,"day")

  const day = dayList.find(day =>
    queryByText(day, "Monday")//query by used because we need it turn return null when doesnt find and keep looking
  );
  expect(getByText(day, "2 spots remaining")).toBeInTheDocument
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const articles = getAllByTestId(container, "appointment")

  const article = articles.find(day =>
    queryByText(day, "Archie Cohen")//query by used because we need it turn return null when doesnt find and keep looking
  );

  const editButton = getByAltText(article, "Edit");

  fireEvent.click(editButton);


  const nameField = getByTestId(container, "student-name-input");

  fireEvent.change(nameField, {
    target: { value: "Mark" }
  });

  const saveButton = getByText(container, "Save");

  fireEvent.click(saveButton);

  expect(getByText(container, "Saving")).toBeInTheDocument();


  await waitForElement(() => getByText(container, "Mark"));

  const dayList = getAllByTestId(container,"day")

  const day = dayList.find(day =>
    queryByText(day, "Monday")//query by used because we need it turn return null when doesnt find and keep looking
  );
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument

})

it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();

  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const articles = getAllByTestId(container, "appointment")

  const article = articles[0];

  const addButton = getByAltText(article, "Add")

  fireEvent.click(addButton)

  fireEvent.change(getByPlaceholderText( article,"Enter Student Name"), {
    target: { value: "Lydia Miller-Jones" }
  });

  const interviewer = getByAltText(article, "Sylvia Palmer");

  fireEvent.click(interviewer);

  const saveButton = getByText(article,"Save");

  fireEvent.click(saveButton);

  expect(getByText(article, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(article, "Error"));

  expect(getByText(article, "Error encoutered while attempting to save")).toBeInTheDocument();

  const closeButton = getByAltText(article, "Close");

  fireEvent.click(closeButton);

  const dayList = getAllByTestId(container,"day")

  const day = dayList.find(day =>
    queryByText(day, "Monday")//query by used because we need it turn return null when doesnt find and keep looking
  );
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument

});



it("shows the delete error when failing to delete an existing appointment", async ()=>{
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const articles = getAllByTestId(container, "appointment")
  
    const article = articles.find(day =>
      queryByText(day, "Archie Cohen")//query by used because we need it turn return null when doesnt find and keep looking
    );
  
    const deleteButton = getByAltText(article, "Delete")
  
    fireEvent.click(deleteButton);
  
    expect(getByText(article,"Are you sure you would like to delete?")).toBeInTheDocument();
  
    fireEvent.click(getByText(container,"Confirm"))
  
    expect(getByText(article, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(article, "Error"));
    
    expect(getByText(article, "Error encoutered while attempting to delete")).toBeInTheDocument();


    const closeButton = getByAltText(article, "Close");

    fireEvent.click(closeButton);
  
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument
  
  
})
