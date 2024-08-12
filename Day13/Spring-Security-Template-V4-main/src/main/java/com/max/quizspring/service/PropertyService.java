package com.max.quizspring.service;

import com.max.quizspring.model.Property;
import com.max.quizspring.repo.PropertyRepos;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    private final PropertyRepos propertyRepository;

    public PropertyService(PropertyRepos propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public Property addProperty(Property property) {
        // Optional: Process or validate the Base64 image here if needed
        return propertyRepository.save(property);
    }

    public List<Property> getPropertiesByLocation(String location) {
        return propertyRepository.findByLocation(location);
    }

    public Property updateProperty(Long id, Property property) {
        System.out.println("Updating property with ID: " + id);
        Optional<Property> existingProperty = propertyRepository.findById(id);
        if (existingProperty.isPresent()) {
            Property updatedProperty = existingProperty.get();
            updatedProperty.setBhk(property.getBhk());
            updatedProperty.setContactName(property.getContactName());
            updatedProperty.setLocation(property.getLocation());
            updatedProperty.setPrice(property.getPrice());
            updatedProperty.setType(property.getType());
            updatedProperty.setImg(property.getImg()); // Update Base64 image
            System.out.println("Updated property: " + updatedProperty);
            return propertyRepository.save(updatedProperty);
        } else {
            System.out.println("Property with ID " + id + " not found.");
            return null;
        }
    }

    public boolean deleteProperty(Long id) {
        if (propertyRepository.existsById(id)) {
            propertyRepository.deleteById(id);

            return true;
        } else {
            return false;
        }
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }
}
