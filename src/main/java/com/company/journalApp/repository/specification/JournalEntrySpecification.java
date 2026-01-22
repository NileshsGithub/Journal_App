package com.company.journalApp.repository.specification;

import com.company.journalApp.entity.JournalEntry;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


public class JournalEntrySpecification {

    public JournalEntrySpecification(){};

    public static Specification<JournalEntry> getJournalEnrtySpecification(Long userId, String title, String contentKeyword, String startDate, String endDate){

        return ((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            Optional.ofNullable(userId).ifPresent(ui -> predicates.add(criteriaBuilder.equal(root.get("userId"),ui)));
            Optional.ofNullable(title).ifPresent(t->predicates.add(criteriaBuilder.equal(root.get("title"),t)));
            Optional.ofNullable(contentKeyword).ifPresent(t->predicates.add(criteriaBuilder.equal(root.get("content"),t)));

            if(startDate != null && endDate != null){
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyy");
                LocalDate startLocalDate = LocalDate.parse(startDate,formatter);
                LocalDate endLocalDate = LocalDate.parse(endDate, formatter);

                Timestamp startTimestamp = Timestamp.valueOf(startLocalDate.atStartOfDay());
                Timestamp endTimeStamp = Timestamp.valueOf(endLocalDate.atStartOfDay());

                predicates.add(criteriaBuilder.between(root.get("createdOn"), startDate, endDate));
            }
            Predicate predicate = criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            query.where(predicate);

            return root.get("id").in(query);
        });
    }
}
