import React from "react";

import { render, cleanup, waitForElement, queryByText, fireEvent, getByText, getByPlaceholderText, getAllByTestId, getByAltText  } from "@testing-library/react";

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
