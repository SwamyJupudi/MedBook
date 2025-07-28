package com.dbp.demo.controller;

import com.dbp.demo.model.Appointment;
import com.dbp.demo.repository.AppointmentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @PostMapping("/scheduleappt")
    public ResponseEntity<?> scheduleAppointment(@RequestBody Appointment appointmentRequest) {

        boolean slotTaken = appointmentRepository.existsByStartTimeAndEndTimeAndLocation(
                appointmentRequest.getStartTime(),
                appointmentRequest.getEndTime(),
                appointmentRequest.getLocation()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("startTime", appointmentRequest.getStartTime());
        response.put("endTime", appointmentRequest.getEndTime());

        if (slotTaken) {
            response.put("scheduled", false);
            response.put("confirmationNumber", null);
        } else {

            String confirmationNumber = generateConfirmationNumber();
            appointmentRequest.setConfirmationNumber(confirmationNumber);
            appointmentRequest.setScheduled(true);
            appointmentRequest.setCancelled(false);
            appointmentRepository.save(appointmentRequest);

            response.put("scheduled", true);
            response.put("confirmationNumber", confirmationNumber);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/searchappt")
    public ResponseEntity<?> searchAppointment(@RequestBody Map<String, String> request) {
        String confirmationNumber = request.get("confirmationNumber");

        Map<String, Object> response = new HashMap<>();

        Optional<Appointment> appointmentOpt = appointmentRepository.findByConfirmationNumber(confirmationNumber);

        if (appointmentOpt.isPresent()) {
            Appointment appointment = appointmentOpt.get();
            response.put("Result", 1);
            response.put("Error", null);
            response.put("firstName", appointment.getFirstName());
            response.put("lastName", appointment.getLastName());
            response.put("age", appointment.getAge());
            response.put("email", appointment.getEmail());
            response.put("phone", appointment.getPhone());
            response.put("gender", appointment.getGender());
            response.put("reasonForVisit", appointment.getReasonForVisit());
            response.put("startTime", appointment.getStartTime());
            response.put("endTime", appointment.getEndTime());
            response.put("location", appointment.getLocation());
            return ResponseEntity.ok(response);
        } else {
            response.put("result", 0);
            response.put("Error", "No data for given confirmation number");
            return ResponseEntity.status(404).body(response);
        }
    }

    @Transactional
    @PostMapping("/cancelappt")
    public ResponseEntity<?> cancelAppointment(@RequestBody Map<String, String> request) {
        String confirmationNumber = request.get("confirmationNumber");

        Map<String, Object> response = new HashMap<>();
        response.put("confirmationNumber", confirmationNumber);

        Optional<Appointment> appointmentOpt = appointmentRepository.findByConfirmationNumber(confirmationNumber);

        if (appointmentOpt.isPresent()) {
            Appointment appointment = appointmentOpt.get();
            appointment.setCancelled(true);
            appointmentRepository.saveAndFlush(appointment);
            response.put("message", "Cancelled successfully");
        } else {
            response.put("message", "No data for given confirmation number");
        }

        return ResponseEntity.ok(response);
    }


    private String generateConfirmationNumber() {
        int length = 7;
        String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < length; i++) {
            sb.append(letters.charAt(random.nextInt(letters.length())));
        }

        return sb.toString();
    }
}
