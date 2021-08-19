## 1. New features of Java 1.8
    1. Interface can have default method.
    2. HashMap insert from head -> insert from tail
    3. HashMap one bucket, too many items in one bucket will be changed to a read-black tree
    4. Functional Interface, Lambda.
    5. Optional class

## 2. how to get current time
```java
import java.util.*;
import java.text.*;

Date timDate = new Date();
DateFormat format = new SimpleDateFormat("HH:mm:ss");
return format.format(timDate);
```
## 3. lambda expression
    It's to simplify override the method when implementing a functional interface. We do not need to new an interface explicitly, we just need to use 
```java
(a, b) -> { return b-a; }
or
(a, b) -> b - a
```
## 4. static
    static method can be called without an instance of the class. just use the class name, then we can call it.

    static variable is an attribution of the class itself, not instance's.

## 5. handle exception
    try catch finally
    multiple catch

## 6. use default method, new feature of Java 1.8
    in an interface, a default method can have its method body.

## 7. optional class
    Optional is a container class, we can use it to wrap it. it has some method like isPresent(), get(), orElse(other), 如果是null, orElse会return给的那个参数, 如果不是null, 会返回里面的值.
    

## 8. is it possible to override a private static method?
    No, even if I have the method of same name, it has no relationship with the one in it's parent class.

## 9. marker interface
    An interface that has empty body, like Serializable, Cloneable.

## 10. avoid NullPointerException
    Before using a method of an object, check the obj is null or not.
    If using toString() method, we can use String.valueOf instead of it.

## 11. join method
    Join method in Java allows one thread to wait until another thread completes its execution.

## 12. state of thread
    start --> ready --> running --> dead
    Wait(), sleep() will cause running thread into waiting. 
    Notify() will wake waiting thread into ready.
    If Join Yield when running, go back to ready.

## 13. deadlock
    If two threads are trying to hold two object A and B, if thread 1 got A and want B, and thread 2 get B and want A, there will be a dead lock. Both of the threads are waiting for the other one to release the lock.

## 14. avoid deadlock
    In one method call, I will hold all of the locks I need in the beginning, if I don't get one lock, I don't have all. If I have one lock, I have all lock.

## 15. IllegalThreadState
    A thread obj cannot be started twice, it ends, it dies. If I want to start thread again, I should create a new Thread obj.

## 16. DispatcherServlet
    DispatcherServlet is a control center, 
    1. it send the request to HandlerMapping, HandlerMapping will tell which controller to use.
    2. then send the request to controller, controller return modelAndView.
    3. then use the viewname to find view in viewResolver.
    4. then send model to the view and then get the response back.

## 17. IoC
    Inversion of Control, it's a design pattern, we let the container to manage our bean objects.
    和DI是指一个东西, DI是从用户角度, IOC是从Spring角度.

## 18. Spring MVC
    Model-View-Controller, Spring MVC is a framework that based on MVC archtecture, it's to simplify the webapp development.

## 19. Exception handle in Spring 
    @ExceptionHandler({SqlException.class, NullPointerException.class}) in controller, before the methods.

## 20. Microservice features
    Advantage: I don't need to shut down the whole application to add some new features, functionalities. 
    Without influence other services.
    In different services, we can even use different tech stack.

    Disadvantage: more people to maintain.
    Might happen data inconsistency.
    Call between different services need more time.

## 21. eureka server
    Registered all of the services, when call between services, they can find each other

## 22. server communicate
    through http request, there is a restTemplate we can use.

## 23. Hibernate
    Is an implementation of JPA, it maps the data between object and table, Object relational work.

## 24. Unit Test
    JUnit, samename as the method and addTest in front of the method name.

## 25. Database connection steps
    SQL as example:
    set driver, url, username and password in application.properties file.

## 26. Difference between @Controller and @RESTController
    @RestController = @Controller + @ResponseBody

## 27. SQL table, SELECT, JOINT

## 28. fetch data
    
## 29. provider, consumer
    @RequestBody(produces = {"application/json", "application/xml"})

## 30. JSON

## 31. design pattern
    singleton pattern
    factory pattern
    obsever pattern

## 32. Find a target number from a singly linked list
    loop

## 33. Find the largest number from a binary tree
    dfs

## 34. What is Serializable
    When we try to send data from backend to database or if we want to convert JSON data into binary to keep data integrity and consistency, we can implement Serializable interface, optional give a serialVersionID.


# Docker
## 1. Where to config the docker, where to pull the image.
    /etc/docker/daemon.json
    add {"registry-mirrors":["https://reg-mirror.qiniu.com/"]}

    docker version
    docker info
    these command to check the docker works well or not, also, docker deamon should be run in this case.

## 2. Useful commands in docker
    docker run: usually used with -it -d options.
    -p bind port on base machine 80:6000, 80 is base machine, 6000 is the port in container
    docker start: 
    docker restart:
    docker stop:
    docker port: check the port bing status

    docker search:

## 3. Docker Hirerachy
    Registry has many images, with one image, we can create many containers, each container is a virtual machine running on my base system.

## 4. What is docker file
    docker file is to tell docker how to build up a image, what dependencies to install.
    for example:
```docker
# This is the base image
FROM openjdk:8-jdk-alpine
# Assign the volume folder, volume is to avoid the container becoming larger and larger
VOLUME /tmp
# ADD /target/SpringBootRESTDemo-0.0.1-SNAPSHOT.jar SpringBootRESTDemo-0.0.1-SNAPSHOT.jar
ADD . /
# Install Maven
RUN apk add --no-cache curl tar bash
ARG MAVEN_VERSION=3.3.9
ARG USER_HOME_DIR="/root"
RUN mkdir -p /usr/share/maven && \
curl -fsSL http://apache.osuosl.org/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz | tar -xzC /usr/share/maven --strip-components=1 && \
ln -s /usr/share/maven/bin/mvn /usr/bin/mvn
ENV MAVEN_HOME /usr/share/maven
ENV MAVEN_CONFIG "$USER_HOME_DIR/.m2"
# speed up Maven JVM a bit
ENV MAVEN_OPTS="-XX:+TieredCompilation -XX:TieredStopAtLevel=1"
ADD /lib/ojdbc6.jar ojdbc6.jar
RUN mvn install:install-file -Dfile=ojdbc6.jar -DgroupId=com.oracle -DartifactId=ojdbc6 -Dversion=11.2.0 -Dpackaging=jar
RUN mvn clean package -Dmaven.test.skip
EXPOSE 8080
ENTRYPOINT ["java","-jar","./target/SpringBootRESTDemo-0.0.1-SNAPSHOT.jar"]
```

# Lucky Dog's Interview
## 1. Introduce yourself

## 2. Difference between hashmap and hashtable
    HashMap is thread not safe but support null as key and value.
    HashTable is thread safe but doesn't support null as key and value.

## 3. why hashtable cannot contain null key
    Since null isn't an object, you can't call .equals() or .hashCode() on it, so the Hashtable can't compute a hash to use it as a key.

## 4. Java generics
    T, we can create a container class that contains other type.

## 5. How HashSet implement internally
    There is a hashmap inside hashset, we only use the key in map as the element in the set. 

    For hashmap, we have an array of Node, the Node is a Key-Value pair of data. we use hashcode to locate
    
## 6. What is the purpose of serial version UID
    For Seariable use, preserve the version, 

## 7. Difference between vector and ArrayList
    Vector is thread safe but slower than ArrayList, ArrayList is not thread safe.

## 8. Difference between ArrayList and LinkedList
    ArrayList based on array, LinkedList is a collection of Nodes linked together.

## LeetCode 287
    finished using binary search
    Coding: int x = 10, y = 30. Exchange x and y without using third variable
    finished

## 9. Spring DI and IoC
    Dependency Injection is that spring manages java bean for us, when we need one java bean object, we do not need to create one by ourselves, that's Inverse of Control by the spring, it will provide one for us, all we need to do is to add @Autowire annotation before the Bean reference. And before that, we need to tell spring which bean we want it to manage for us. It can be configured by xml or annotation.

## 10. Component Scan
    It's to tell spring where to look for the spring beans.

# Langyan Interview
## 1. What dependencies are necessary for a new Spring boot application?
    Spring web
    JDBC Driver if want to connect to a database.

## 2. Difference between Controller and RestController
    @RestController = @Controller + @ResponseBody

## 3. Functional interface
## 4. Difference between lambda and functional interface
    anonymous class use new on an interface, and override methods in it, it can also be used in non-functional interface. lambda can only be used in functional interface, because we passed a method in it 

## 5. What are streams in java 8
    A stream is a sequence of objects that used on collections, it supports various methods like map, filter, which can be pipelined to produce the desired result.

## 6. How many types of streams methods are there in java 8
### Intermidiate operation:
    map: 需要Function作为参数, Function也是一个FunctionalInterface.
    filter: 需要Predicate作为参数, Predicate是一个只能返回boolean的FunctionalInterface.
    distinct: 不需要参数, 消除重复项.
    sorted: 可选一个Comparator作为参数, 用于排序.
    limit: long作为参数, 返回含有这么多个内容的stream
    skip: long作为参数, 返回跳过头n个数的stream

### Terminal operation:
    forEach: 需要一个Consumer作为参数, Consumer是一个没有返回值的FunctionalInterface.
    toArray: 返回成Array, 但是只能是Object[]
    reduce: 三种重载方法, 
        1. 累加, a是缓存, b是各个元素. 返回Optional, 里面是内部的a, 需要用get或orElse取值.
        2. 和第一个差不多, 但是多给一个参数, 这个参数是初始a的值, 上一个的a的初始值是list的第一个值, 不会return Optional.
        3. 和第二个差不多, 但是这个可以返回的类型和stream里面的类型不一样. 一个应用场景: 检测一个数组里面是否含某值, 初值给false, return a || b == target, 第三个参数随便给, 是给parallel stream用的.
    collect: 返回List或Set, 需要Collector作为参数, 一般用Collectors来简略步骤, 甚至可以toMap, 这时就需要两个Function作为参数. Collectors还有很多其他方法, 日后再看. TODO
    min / max: 返回stream 中最大或最小值, 可选一个Comparator作为参数, 也就意味着min可以返回最大值, max也可以返回最小值, 但是不建议这么做, 降低可读性.
    count: 返回stream中元素个数, 返回值是long.
    anyMatch / allMatch / noneMatch: 以一个Predicate作为参数, 前者返回true如果stream中有一个符合Predicate的判断, 中者返回true必须所有的elements都符合Predicate的判断, 后者返回true如果所有elements都不满足.
    findFirst / findAny: 返回stream中第一个 / 任意一个element

## 7. What is parallel stream
    If operation to the stream needs long time, it's better to use parallelStream, it will be faster than stream.

## 8. What is multi-threading
    Multi-threading is that when a program is running, it allows some tasks to be executed simultaneously, they run concurrently, so the whole program usually can be run faster.

## 9. What is race condition
    Multiple thread wants to get a common resource simultaneously. 

## 10. What is inheritence in java
## 11. How to convert a list of Employee into a HashMap, Employee Object as key and name as value
```java
List<Employee> list;
list.stream().collect(Collectors.toMap(a->a, a->a.getName()));
```

## 12. If I have duplicate objects in the list, how to deal with it?
    @Override the hashcode() method and equals()

## 13. Difference between deep copy and shallow copy?
    the object we want to copy may have inner objects, shallow copy is that for the inner object, we only copy the reference. For deep copy, we create a new one object has the same attributions for it.

## 14. What is trigger?
    If some events happens, sometimes in order to keep the integrity of a database, we need to execute some code to the database.
    create trigger before insert ...

## 15. What is stored procedure?
## 16. What are ACID properties in database?
    Atomicity: Operations in a transaction must be done completely, or completely not done.

    Consistency: Before transaction begin and after transaction finish. The integrity of database must not be broken. 

    Isolation: When multiple transactions are running concurrently, isolation will prevent the data from inconsistency.

    Durability: After a transaction is done, the modification to the database is permanent.

## 17. If a query just run seconds in my environment, but takes long time in deployment environment, how to analysis it?
## 18. How to convert monotone application into microservice application?
## 19. What are advantage of springboot?
    Spring Boot is an extension of Spring Framework, it eliminates the XML configurations when we set up an Spring Application. It has built-in Tomcat server.

# Guangzhe Interview
## 1. Different layers in Springboot application.
    Controller, Service, DAO

## 2. What is microservice
    MicroService split a big project into different small portions, and each portion is a service. 

## 3. Eureka
    To register all of the service in order to make 

## 4. Different between Bean and Component
    @Bean is used before an method which returns an Bean Object, usually it's used with @Configuration. @Component is used before a Bean class, it will automatically 


