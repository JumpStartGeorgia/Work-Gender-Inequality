class SurveyResult < ActiveRecord::Base


  #############################################
  # create a crosstab on two columns in this table
  # - row: item that appears down the rows (left side)
  # - column: item that appears across the columns (top side)
  # return: hash wil the following
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
  def self.crosstab_count(row, column)
    result = {}
    # get the question/answers for these items
    q_row = SurveyQuestion.with_answers(row)
    q_col = SurveyQuestion.with_answers(column)

    if q_row.present? && q_col.present?
      # get the crosstab data
      # - note: crosstab only gets counts, not percents
      data = nil
      begin
        data = call_sproc("call survey_crosstab_count('#{row}', '#{column}')")
      
#### the rescue is not working!
      rescue ActiveRecord::StatementInvalid
        # this is in case one of the variables cannot be found in table
        puts 'error!'
      end

      if data.present?
        # put all of the data together

        # save the questions and answers
        result[:row_question] = q_row.text
        result[:row_answers] = q_row.answers.map{|x| [x.value, x.text]}
        result[:column_question] = q_col.text
        result[:column_answers] = q_col.answers.map{|x| [x.value, x.text]}

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

        # if row or column is the region variable, create the map data
        if row.downcase == 'reg' || column.downcase == 'reg'
          result[:map_percents] = {}
          result[:map_counts] = {}

          # if the row is the region, recompute percents so columns add up to 100%
          if row.downcase == 'reg'
            result[:map_filter] = result[:column_question]
            result[:map_filters] = result[:column_answers]

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
              result[:map_percents][col_answer[0].to_s] = Hash.new
              result[:map_counts][col_answer[0].to_s] = Hash.new

              # now store the results for each region
              (0..result[:row_answers].length-1).each do |index|
                result[:map_percents][col_answer[0].to_s][result[:row_answers][index][1].to_s] = percents[col_index][index]
                result[:map_counts][col_answer[0].to_s][result[:row_answers][index][1].to_s] = counts[col_index][index]
              end 
            end

          else
            result[:map_filter] = result[:row_question]
            result[:map_filters] = result[:row_answers]

            result[:row_answers].each_with_index do |row_answer, row_index|
              # create hash to store the data for this answer
              result[:map_percents][row_answer[0].to_s] = Hash.new
              result[:map_counts][row_answer[0].to_s] = Hash.new

              # now store the results for each region
              (0..result[:column_answers].length-1).each do |index|
                result[:map_percents][row_answer[0].to_s][result[:column_answers][index][1].to_s] = result[:percents][row_index][index]
                result[:map_counts][row_answer[0].to_s][result[:column_answers][index][1].to_s] = result[:counts][row_index][index]
              end 
            end
          end

        end
      end
    end

    return result
  end
end
