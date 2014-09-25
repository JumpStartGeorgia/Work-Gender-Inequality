class SurveyResult < ActiveRecord::Base


  #############################################
  # create a crosstab on two columns in this table
  # - row: item that appears down the rows (left side)
  # - column: item that appears across the columns (top side)
  # return: array of hashes
  # - the row will have it's own key (e.g., if row = 'h1', the result will be {'h1' => 5, ...}) and the value is it's unique value for that row
  # - the possible column values will be the rest of the key names
  # -- the values are the number of records where the row and column have a match 
  def self.crosstab_count(row, column)
    call_sproc("call survey_crosstab_count('#{row}', '#{column}')")
  end
end
