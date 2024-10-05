package com.todo.todoserver.repository.Custom;

import java.util.ArrayList;

import com.todo.todoserver.model.ToDo;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Predicate;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class TodoQueryBuilder {
    public CriteriaQuery<ToDo> buildToDoQuery(String authId, Boolean status, String search, CriteriaBuilder cb, EntityManager entityManager, Pageable pageable) {
        CriteriaQuery<ToDo> cq = cb.createQuery(ToDo.class);
        Root<ToDo> toDo = cq.from(ToDo.class);

        List<Predicate> predicates = new ArrayList<>();

        predicates.add(cb.equal(toDo.get("author").get("authId"), authId));

        if (status != null) {
            predicates.add(cb.equal(toDo.get("status"), status));
        }

        if (search != null && !search.isEmpty()) {
            predicates.add(cb.or(
                cb.like(cb.lower(toDo.get("title")), "%" + search.toLowerCase() + "%"),
                cb.like(cb.lower(toDo.get("text")), "%" + search.toLowerCase() + "%")
            ));
        }

        cq.where(cb.and(predicates.toArray(new Predicate[0])));

        if (pageable.getSort().isSorted()) {
            List<Order> orders = pageable.getSort().stream()
                .map(order -> order.isAscending() 
                    ? cb.asc(toDo.get(order.getProperty())) 
                    : cb.desc(toDo.get(order.getProperty())))
                .toList();
            cq.orderBy(orders);
        }

        return cq;
    }

    public CriteriaQuery<Long> buildCountQuery(String authId, Boolean status, String search, CriteriaBuilder cb, EntityManager entityManager) {
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<ToDo> toDoCount = countQuery.from(ToDo.class);

        List<Predicate> predicates = new ArrayList<>();

        predicates.add(cb.equal(toDoCount.get("author").get("authId"), authId));

        if (status != null) {
            predicates.add(cb.equal(toDoCount.get("status"), status));
        }

        if (search != null && !search.isEmpty()) {
            predicates.add(cb.or(
                cb.like(cb.lower(toDoCount.get("title")), "%" + search.toLowerCase() + "%"),
                cb.like(cb.lower(toDoCount.get("text")), "%" + search.toLowerCase() + "%")
            ));
        }

        countQuery.where(cb.and(predicates.toArray(new Predicate[0])));
        countQuery.select(cb.count(toDoCount));
        return countQuery;
    }
}
