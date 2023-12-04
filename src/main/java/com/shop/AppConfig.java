package com.shop;
/*
//AppConfig.java
@Configuration
public class AppConfig implements WebMvcConfigurer {

 @Override
 public void addResourceHandlers(ResourceHandlerRegistry registry) {
     registry.addResourceHandler("/uploads/**")
             .addResourceLocations("file:uploads/")
             .setCachePeriod(0);
 }

 @Override
 public void configurePathMatch(PathMatchConfigurer configurer) {
     configurer.setUseSuffixPatternMatch(false);
 }

 @Bean
 public MultipartResolver multipartResolver() {
     CommonsMultipartResolver resolver = new CommonsMultipartResolver();
     resolver.setMaxUploadSizePerFile(5 * 1024 * 1024); // 5MB
     return resolver;
 }
}
}
*/