package com.todo.todoserver.repository;

import com.todo.todoserver.model.ToDo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import java.util.List;
import java.util.Optional;

@Repository
public class CustomTodoRepositoryImpl implements CustomTodoRepository {

  @Autowired
  private EntityManager entityManager;

  @Override
  public Optional<List<ToDo>> findTodos(String authId, Boolean status, String search, Sort sort) {
    CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    CriteriaQuery<ToDo> cq = cb.createQuery(ToDo.class);
    Root<ToDo> toDo = cq.from(ToDo.class);

    Predicate authIdPredicate = cb.equal(toDo.get("author").get("authId"), authId);
    Predicate statusPredicate = status != null ? cb.equal(toDo.get("status"), status) : cb.conjunction();
    Predicate searchPredicate = search != null && !search.isEmpty() ? cb.or(
        cb.like(cb.lower(toDo.get("title")), "%" + search.toLowerCase() + "%"),
        cb.like(cb.lower(toDo.get("text")), "%" + search.toLowerCase() + "%")) : cb.conjunction();

    cq.where(cb.and(authIdPredicate, statusPredicate, searchPredicate));

    if (sort != null) {
      List<Order> orders = sort.stream()
          .map(order -> order.isAscending() ? cb.asc(toDo.get(order.getProperty()))
              : cb.desc(toDo.get(order.getProperty())))
          .toList();
      cq.orderBy(orders);
    }

    TypedQuery<ToDo> query = entityManager.createQuery(cq);
    return Optional.of(query.getResultList());
  }
}
