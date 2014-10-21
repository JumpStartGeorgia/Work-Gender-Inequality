class SurveyResult < ActiveRecord::Base



  #############################################
  # create a crosstab on two columns in this table
  # - row: item that appears down the rows (left side)
  # - filter: if provided, indicates a field and value to filter the data by
  #           format: {code: ____, value: ______}
  # - exclude_dkra: flag indicating if don't know/refuse to answer answers should be ignored
  # return: hash with the following
  # - row_question: text of question for rows
  # - row_answers: array of [value, text] for each answer in this question
  # - total_responses: total number of responses (sum of all counts)
  # - counts: array of arrays of counts
  #   - this is just numbers, headings for rows and answers are in row/col_answers in same order
  #   - each array represents each row answer
  #   - each item in the array represents the count of the match of row to column
  # - precents: same as counts, but converted into percents
  # - chart: data formatted for highcharts
  #   - labels: axis lables
  #   - data: series data
  # - map: data formatted for leaflet
  def self.onevar_count(row, options={})
    filter = options[:filter]
    exclude_dkra = options[:exclude_dkra] == true
    logger.debug "//////////// onevar vars - row: #{row}, filter: #{filter}, exclude_dkra: #{exclude_dkra}"
    result = {}
    # get the question/answers for these items
    q_row = SurveyQuestion.with_answers(row)

    if q_row.present?
      # get the data
      # - note: query only gets counts, not percents
      data = nil
      begin
        # if filter is provided, create the sql where statement for it
        sql_filter = ''
        if filter.present?
          sql_filter << ' and '
          sql_filter << filter[:code].to_s
          sql_filter << "="
          sql_filter << filter[:value].to_s
        end

        data = call_sproc("call survey_onevar_count('#{row}', '#{sql_filter}')")
      
#### the rescue is not working!
      rescue ActiveRecord::StatementInvalid => e
        # this is in case one of the variables cannot be found in table
        puts "error: #{e}"
      end

      if data.present?
        # put all of the data together

        result[:type] = 'onevar'

        # save the questions and answers
        # if exclude_dkra is true, only get use the answers that cannot be excluded
        result[:row_question] = q_row.text
        result[:row_answers] = (exclude_dkra == true ? q_row.answers.select{|x| x.can_exclude == false} : q_row.answers).map{|x| [x.value, x.text]}

        # put the counts into a new array to make sure all row and column answers are included
        result[:counts] = []
        result[:row_answers].each do |row_answer|

          # look for match in data
          data_row = data.select{|x| x[row] == row_answer[0]}.first
          if data_row.present?
            # ok, found row
            result[:counts] << data_row['count']
          else
            # this answer had no values, so set to zero
            result[:counts] << 0
          end
        end

        # take counts and turn into percents
        result[:percents] = []
        total = result[:counts].inject(:+)
        result[:counts].each do |count_item|
          result[:percents] << (count_item.to_f/total*100).round(2)
        end


        # format data for charts 
        # pie chart requires data to be in following format:
        # [ {name, y, count}, {name, y, count}, ...]
        result[:chart] = {}
#        result[:chart][:labels] = result[:row_answers].map{|x| x[1]}
        result[:chart][:data] = []
#        result[:chart][:data] << {data: result[:counts]}
        (0..result[:row_answers].length-1).each do |index|
          result[:chart][:data] << {
              name: result[:row_answers][index][1], 
              y: result[:percents][index], 
              count: result[:counts][index], 
          }
        end


        # record the total number of responses
        result[:total_responses] = result[:counts].inject(:+)


        # if row is a mappable variable, create the map data
        if q_row.is_mappable
          result[:map] = {}
          result[:map][:percents] = {}
          result[:map][:counts] = {}
          result[:map][:data] = []

          result[:row_answers].each_with_index do |row_answer, row_index|
            # create hash to store the data for this answer
            result[:map][:percents][row_answer[1]] = {}
            result[:map][:counts][row_answer[1]] = {}

            # now store the results for each item
            result[:map][:percents][row_answer[1]] = result[:percents][row_index]
            result[:map][:counts][row_answer[1]] = result[:counts][row_index]

            # store in highmaps format: {name, value, count}
            result[:map][:data] << {:name => row_answer[1], :value => result[:percents][row_index], :count => result[:counts][row_index]}
          end
        end

      end
    end

    return result
  end

  #############################################
  # create a crosstab on two columns in this table
  # - row: item that appears down the rows (left side)
  # - column: item that appears across the columns (top side)
  # - filter: if provided, indicates a field and value to filter the crosstab by
  #           format: {code: ____, value: ______}
  # - exclude_dkra: flag indicating if don't know/refuse to answer answers should be ignored
  # return: hash with the following
  # - row_question: text of question for rows
  # - row_answers: array of [value, text] for each answer in this question
  # - col_question: text of question for columns
  # - col_answers: array of [value, text] for each answer in this question
  # - total_responses: total number of responses (sum of all counts)
  # - counts: array of arrays of counts
  #   - this is just numbers, headings for rows and answers are in row/col_answers in same order
  #   - each array represents each row answer
  #   - each item in the array represents the count of the match of row to column
  # - precents: same as counts, but converted into percents
  # - chart: data formatted for highcharts
  #   - labels: axis lables
  #   - data: series data
  # - map: data formatted for leaflet
  def self.crosstab_count(row, column, options={})
    filter = options[:filter]
    exclude_dkra = options[:exclude_dkra] == true
    logger.debug "//////////// crosstab vars - row: #{row}, col: #{column}, filter: #{filter}, exclude_dkra: #{exclude_dkra}"
    result = {}
    # get the question/answers for these items
    q_row = SurveyQuestion.with_answers(row)
    q_col = SurveyQuestion.with_answers(column)

    if q_row.present? && q_col.present?
      # get the crosstab data
      # - note: crosstab only gets counts, not percents
      data = nil
      begin
        # if filter is provided, create the sql where statement for it
        sql_filter = ''
        if filter.present?
          sql_filter << ' and '
          sql_filter << filter[:code].to_s
          sql_filter << "="
          sql_filter << filter[:value].to_s
        end

        data = call_sproc("call survey_crosstab_count('#{row}', '#{column}', '#{sql_filter}')")
      
#### the rescue is not working!
      rescue ActiveRecord::StatementInvalid => e
        # this is in case one of the variables cannot be found in table
        puts "error: #{e}"
      end

      if data.present?
        # put all of the data together
        result[:type] = 'crosstab'

        # save the questions and answers
        # if exclude_dkra is true, only get use the answers that cannot be excluded
        result[:row_question] = q_row.text
        result[:row_answers] = (exclude_dkra == true ? q_row.answers.select{|x| x.can_exclude == false} : q_row.answers).map{|x| [x.value, x.text]}
        result[:column_question] = q_col.text
        result[:column_answers] = (exclude_dkra == true ? q_col.answers.select{|x| x.can_exclude == false} : q_col.answers).map{|x| [x.value, x.text]}

        # put the counts into a new array to make sure all row and column answers are included
        result[:counts] = []
        result[:row_answers].each do |row_answer|
          # look for match in data
          data_row = data.select{|x| x[row] == row_answer[0]}
          if data_row.present?
            # ok, found row
            # now look for match for each column answer
            count_row = []
            result[:column_answers].each do |col_answer|
              data_col = data_row.first.select{|k,v| k == col_answer[0].to_s}.map{|k,v| v}.first
              if data_col.present?
                count_row << data_col
              else
                # could not be found, so set to 0
                count_row << 0
              end
            end
            result[:counts] << count_row
          else
            # this answer had no values, so set to zero
            result[:counts] << Array.new(result[:column_answers].length){0}
          end

        end

        # format data for charts
        result[:chart] = {}
        result[:chart][:labels] = result[:row_answers].map{|x| x[1]}
        result[:chart][:data] = []
        counts = result[:counts].transpose

        (0..result[:column_answers].length-1).each do |index|
          item = {}
          item[:name] = result[:column_answers][index][1]
          item[:data] = counts[index]
          result[:chart][:data] << item
        end

        # take counts and turn into percents
        result[:percents] = []
        totals = []
        result[:counts].each do |count_row|
          total = count_row.inject(:+)
          totals << total
          if total > 0
            percent_row = []
            count_row.each do |item|
              percent_row << (item.to_f/total*100).round(2)
            end
            result[:percents] << percent_row
          else
            result[:percents] << Array.new(count_row.length){0}
          end
        end

        # record the total number of responses
        result[:total_responses] = totals.inject(:+)

        # if row or column is a mappable variable, create the map data
        if q_row.is_mappable || q_col.is_mappable
          result[:map] = {}
          result[:map][:percents] = {}
          result[:map][:counts] = {}
          result[:map][:data] = {}

          # if the row is the mappable, recompute percents so columns add up to 100%
          if q_row.is_mappable
            result[:map][:filter] = result[:column_question]
            result[:map][:filters] = result[:column_answers]

            counts = result[:counts].transpose
            percents = []
            counts.each do |count_row|
              total = count_row.inject(:+)
              if total > 0
                percent_row = []
                count_row.each do |item|
                  percent_row << (item.to_f/total*100).round(2)
                end
                percents << percent_row
              else
                percents << Array.new(count_row.length){0}
              end
            end

            result[:column_answers].each_with_index do |col_answer, col_index|
              # create hash to store the data for this answer
              result[:map][:percents][col_answer[0].to_s] = {}
              result[:map][:counts][col_answer[0].to_s] = {}
              result[:map][:data][col_answer[0].to_s] = []

              # now store the results for each item
              (0..result[:row_answers].length-1).each do |index|
                result[:map][:percents][col_answer[0].to_s][result[:row_answers][index][1].to_s] = percents[col_index][index]
                result[:map][:counts][col_answer[0].to_s][result[:row_answers][index][1].to_s] = counts[col_index][index]

                # store in highmaps format: {name, value, count}
                result[:map][:data][col_answer[0].to_s] << {:name => result[:row_answers][index][1], :value => percents[col_index][index], :count => counts[col_index][index]}
              end 
            end

          else
            result[:map][:filter] = result[:row_question]
            result[:map][:filters] = result[:row_answers]

            result[:row_answers].each_with_index do |row_answer, row_index|
              # create hash to store the data for this answer
              result[:map][:percents][row_answer[0].to_s] = {}
              result[:map][:counts][row_answer[0].to_s] = {}
              result[:map][:data][row_answer[0].to_s] = []

              # now store the results for each item
              (0..result[:column_answers].length-1).each do |index|
                result[:map][:percents][row_answer[0].to_s][result[:column_answers][index][1].to_s] = result[:percents][row_index][index]
                result[:map][:counts][row_answer[0].to_s][result[:column_answers][index][1].to_s] = result[:counts][row_index][index]

                # store in highmaps format: {name, value, count}
                result[:map][:data][row_answer[0].to_s] << {:name => result[:column_answers][index][1], :value => result[:percents][row_index][index], :count => result[:counts][row_index][index]}
              end 
            end
          end

        end
      end
    end

    return result
  end
end
