package com.mright.lover.platform.dao;

import com.mright.lover.platform.entity.Something;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ISomethingDao {

    List<Something> listSomethingByKeyAndUsername(@Param("key") String key, @Param("username") String username);

    List<Something> listSomething(@Param("username") String username);

    List<Something> listAllSomething();

    int insert(Something something);

    int update(Something something);

    int delete(Integer id);
}
