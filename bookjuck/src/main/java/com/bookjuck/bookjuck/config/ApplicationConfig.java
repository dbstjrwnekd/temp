package com.bookjuck.bookjuck.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ComponentScan(basePackages = {"com.bookjuck.bookjuck.DAO", "com.bookjuck.bookjuck.service"})
@Import({DBConfig.class})
public class ApplicationConfig {
}
