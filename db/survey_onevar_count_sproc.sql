drop procedure if exists survey_onevar_count;

DELIMITER //
CREATE PROCEDURE survey_onevar_count(field_rows varchar(50), field_where varchar(1000))
  BEGIN

    set @sql := concat('select ', 
              SQL_ESC(field_rows), 
              ', count(*) as count from survey_results where ',
              SQL_ESC(field_rows), ' != "" ',
              field_where,
              ' GROUP BY ',
                 SQL_ESC(field_rows)
    );

  PREPARE stmt FROM @sql; 
  EXECUTE stmt; 
  DEALLOCATE PREPARE stmt;
      
  END //
DELIMITER ;
