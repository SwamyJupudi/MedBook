package com.dbp.demo.repository;

import com.dbp.demo.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    boolean existsByStartTimeAndEndTimeAndLocation(String startTime, String endTime, String location);


    Optional<Appointment> findByConfirmationNumber(String confirmationNumber);

}
