package com.todo.todoserver.repository.Custom;

import com.todo.todoserver.model.ToDo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import java.util.List;

@Repository
public class CustomTodoRepositoryImpl implements CustomTodoRepository {

  @Autowired
  private EntityManager entityManager;

  @Autowired
  private TodoQueryBuilder todoQueryBuilder;

  @Override
  public Page<ToDo> findTodos(String authId, Boolean status, String search, Pageable pageable) {
    CriteriaBuilder cb = entityManager.getCriteriaBuilder();

    CriteriaQuery<ToDo> criteriaQuery = todoQueryBuilder.buildToDoQuery(authId, status, search, cb, entityManager,
        pageable);
    TypedQuery<ToDo> query = entityManager.createQuery(criteriaQuery);

    query.setFirstResult((int) pageable.getOffset());
    query.setMaxResults(pageable.getPageSize());

    List<ToDo> todos = query.getResultList();

    Long totalCount = entityManager.createQuery(
        todoQueryBuilder.buildCountQuery(authId, status, search, cb, entityManager)).getSingleResult();

    return new PageImpl<>(todos, pageable, totalCount);
  }
}
