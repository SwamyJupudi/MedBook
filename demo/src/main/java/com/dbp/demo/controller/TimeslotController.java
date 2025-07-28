package com.dbp.demo.controller;

import com.dbp.demo.model.Timeslot;
import com.dbp.demo.service.TimeslotService;
import com.dbp.demo.exception.LocationNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api")
public class TimeslotController {

    @Autowired
    private TimeslotService timeslotService;

    @PostMapping("/getSlots")
    public ResponseEntity<?> getSlots(@RequestBody Map<String, String> request) {
        String dateInput = request.get("time").split("T")[0]; // "2025-03-27"
        String location = request.get("location");

        try {
            List<Timeslot> timeslots = timeslotService.getAvailableTimeslots(dateInput, location);

            // Formatters
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

            Set<String> seenSlots = new HashSet<>();
            List<Map<String, String>> responseList = new ArrayList<>();

            for (Timeslot slot : timeslots) {
                String start = dateInput + "T" + LocalTime.parse(slot.getStartTime(), timeFormatter).format(timeFormatter);
                String end = dateInput + "T" + LocalTime.parse(slot.getEndTime(), timeFormatter).format(timeFormatter);

                String key = start + "-" + end;
                if (!seenSlots.contains(key)) {
                    seenSlots.add(key);

                    Map<String, String> slotMap = new HashMap<>();
                    slotMap.put("startTime", start);
                    slotMap.put("endTime", end);
                    responseList.add(slotMap);
                }
            }

            Map<String, Object> response = new HashMap<>();
            response.put("timeslots", responseList);

            return ResponseEntity.ok(response);

        } catch (LocationNotFoundException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(404).body(errorResponse);
        }
    }
}
