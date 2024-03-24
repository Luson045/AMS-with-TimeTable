import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getEnvironment from "../../getenvironment";
import { Container } from "@chakra-ui/layout";
import { FormControl, FormLabel, Heading, Input, Select, useToast } from '@chakra-ui/react';
import {CustomTh, CustomLink,CustomTealButton} from '../../styles/customStyles'
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import { Button } from "@chakra-ui/button";
import { Center, Square, Circle } from '@chakra-ui/react'
import Header from "../../components/header";
import { useDisclosure } from "@chakra-ui/hooks";

function CMDashboard() {
  const navigate = useNavigate();
  const toast = useToast();
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const apiUrl = getEnvironment();
  const [sessions, setSessions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isEventLocked, setEventLocked] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [certificateCount,setCertificateCount]=useState(0)

  // Function to fetch certificates for a specific event
  const fetchCertificates = async (eventId) => {
    try {
      const url = `${apiUrl}/certificatemodule/addevent/getcertificates/${eventId}`;
      console.log("Fetching certificates with URL:", url);
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (response.ok) {
        const data = await response.json();
        setCertificates(data);
      } else {
        console.error(`Failed to fetch certificates for event ${eventId}`);
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };
    // Update the useEffect to fetch certificates when the component mounts
  useEffect(() => {
    console.log("Fetching events with apiUrl:", apiUrl);
    fetchEvents();
  }, [apiUrl, isEventLocked]);
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${apiUrl}/certificatemodule/addevent/getevents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      // console.log("Response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        // console.log(data)
        setTable(data.data);
        setCertificateCount(data.totalCount)
      } else {
        console.error("Failed to fetch timetables");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const lockEvent = async (id) => {
    try {
      const confirmed = window.confirm('Sure? You wont be able to edit any content once locked!');

    if (!confirmed) {
      // If the user cancels, do nothing
      return;
    }
      const response = await fetch(`${apiUrl}/certificatemodule/addevent/lock/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({ lock: true }),
      });

      // Check if the request was successful (you may need to handle other status codes)
      if (response.ok) {
        // Update the state to reflect that the event is locked
        setEventLocked(true);
        toast({
          title: 'Event Locked',
          description: 'The event has been locked successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position:'middle',
        });
        console.log('Event locked successfully!');
      } else {
        console.error('Failed to lock the event');
      }
    } catch (error) {
      console.error('Error locking the event:', error);
    }
  };
  
  useEffect(() => {
    console.log("Fetching events with apiUrl:", apiUrl);
    fetchEvents();
  }, [apiUrl, isEventLocked]);
  
  const currentUrl = window.location.href;
  const urlParts = currentUrl.split("/");
  const domainName = urlParts[2];

  return (
    <Container maxW='5xl'>
        <Header title="List of Events"></Header>
        <p>
          Count of Certificates Generated: {certificateCount}
        </p>
      <TableContainer>
        <Table
        variant='striped'
        size="md" 
        mt="1"
        >
          <Thead>
            <Tr>
              <CustomTh>Event Name</CustomTh>
              <CustomTh>Event Date</CustomTh>
              {/* <CustomTh>Department/Club</CustomTh> */}
              <CustomTh>Edit certificate details</CustomTh>
              <CustomTh>Edit participant details</CustomTh>
              <CustomTh>Lock Status</CustomTh>
            </Tr>
          </Thead>
          <Tbody>
            {table.map((event) => (
              <Tr key={event._id}>
                <Td><Center>{event.name}</Center></Td>
                <Td><Center>{new Date(event.ExpiryDate).toLocaleDateString('en-GB')}</Center></Td>
                {/* <Td><Center>{event.date}</Center></Td> */}
                {!event.lock  ? (

                <Td>
                  <Center>
                <CustomLink
                href={`http://${domainName}/cm/${event._id}`}
                 // Optional: If you want to open the link in a new tab
              >
                {event.name} Certificates
              </CustomLink></Center>
                </Td>):
                (                <Td>
                  <Center>
                
                Certificates Locked
                
             </Center>
                </Td>
)}
                <Td>
                {!event.lock  ? (

                  <Center>
                <CustomLink
                href={`http://${domainName}/cm/${event._id}/addparticipant`}
                // target="_blank" // Optional: If you want to open the link in a new tab
              >
                {event.name} participants
              </CustomLink>
              <Button onClick={() => fetchCertificates(event._id)}>
              Fetch Certificates
            </Button>

              </Center>):
                (  <Center>
                  Participants Locked
                </Center>)}
                </Td>
                <Td>
                <center>
                {!event.lock ? (
  <CustomTealButton onClick={() => lockEvent(event._id)} disabled={isEventLocked}>
    Lock The Event
  </CustomTealButton>
) : (
  <span>Event Locked on {new Date(event.updated_at).toLocaleDateString('en-GB')}</span>
)}
     </center>
                </Td>

              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {loading && <p>Loading...</p>}
    </Container>
  );
}

export default CMDashboard;
