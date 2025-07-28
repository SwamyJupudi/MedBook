package com.dbp.demo.service;

import com.dbp.demo.model.Timeslot;
import com.dbp.demo.repository.TimeslotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dbp.demo.exception.LocationNotFoundException;


import java.util.List;

@Service
public class TimeslotService {

    @Autowired
    private TimeslotRepository timeslotRepository;

    public List<Timeslot> getAvailableTimeslots(String date, String location) {
        List<Timeslot> slots = timeslotRepository.findByDateAndLocation(date, location);

        if (slots.isEmpty()) {
            throw new LocationNotFoundException("Location not available");
        }

        return slots;
    }
}
