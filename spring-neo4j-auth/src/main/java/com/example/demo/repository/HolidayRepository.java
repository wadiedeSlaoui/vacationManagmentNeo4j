package com.example.demo.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import com.example.demo.model.Holiday;

public interface HolidayRepository extends  Neo4jRepository<Holiday, Long> {

}
