class RootController < ApplicationController

  def index

    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def faq
    @faq_categories = FaqCategory.sorted
    @faqs = Faq.sorted

    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def explore_data
    @use_map = true
    
    # the questions for cross tab can only be those that have code answers
    @questions = SurveyQuestion.can_crosstab.sorted

    @filter_answers = SurveyAnswer.all

    # initialize variables
    # start with a random question
    @row = @questions.sample.code
    @col = nil
    @filter = nil

    # check to make sure row and col param is in list of questions, if provided
    if params[:row].present? && @questions.index{|x| x.code == params[:row]}.present?
      @row = params[:row]
    end
    if params[:col].present? && @questions.index{|x| x.code == params[:col]}.present?
      @col = params[:col]
    end

    # check for valid filter values
    if params[:filter_variable].present? && params[:filter_value].present? &&
      q_index = @questions.index{|x| x.code == params[:filter_variable]}
      a_index = @filter_answers.index{|x| x.code == params[:filter_variable] && x.value.to_s == params[:filter_value]}
      
      if q_index.present? && a_index.present?
        @filter = {code: params[:filter_variable], value: params[:filter_value], name: @questions[q_index].text, answer: @filter_answers[a_index].text }
      end       
    end

    # get the data
    options = {}
    options[:filter] = @filter if @filter.present?
    options[:exclude_dkra] = params[:exclude_dkra].to_bool if params[:exclude_dkra].present?

    # if @col has data, then this is a crosstab,
    # else this is just a single variable lookup
    if @col.present?
      @data = SurveyResult.crosstab_count(@row, @col, options)

      if @data[:chart]
        gon.crosstab_chart_data = @data[:chart][:data]
        gon.crosstab_chart_labels = @data[:chart][:labels]
        gon.crosstab_chart_title = build_crosstab_chart_title(@data[:row_question], @data[:column_question], @filter, @data[:total_responses])
        gon.crosstab_chart_col_label = @data[:column_question]
        gon.crosstab_chart_row_label = @data[:row_question]
      end
      if @data[:map_percents].present?
        gon.crosstab_map_percents = @data[:map_percents]
        gon.crosstab_map_counts = @data[:map_counts]
        gon.crosstab_map_filters = @data[:map_filters] # this is array of arrays: [[code, name], [code, name],...]
      end
    else
      @data = SurveyResult.onevar_count(@row, options)

      if @data[:chart]
        gon.onevar_chart_data = @data[:chart][:data]
        gon.onevar_chart_title = build_onevar_chart_title(@data[:row_question], @filter, @data[:total_responses])
        gon.onevar_chart_row_label = @data[:row_question]
      end
      if @data[:map_percents].present?
        gon.onevar_map_percents = @data[:map_percents]
        gon.onevar_map_counts = @data[:map_counts]
      end
    end

  end
  
  respond_to do |format|
    format.html # index.html.erb
  end

private

  def build_crosstab_chart_title(row, col, filter, total)
    title = t('root.explore_data.crosstab.chart.title', :row => row, :col => col)
    if filter.present?
      title << t('root.explore_data.crosstab.chart.title_filter', :variable => filter[:name], :value => filter[:answer] )
    end
    title << "<br /> <span class='total_responses'>("
    title << t('root.explore_data.crosstab.chart.title_total', :num => total)
    title << ")</span>"
    return title.html_safe
  end 

  def build_onevar_chart_title(row, filter, total)
    title = t('root.explore_data.onevar.chart.title', :row => row)
    if filter.present?
      title << t('root.explore_data.onevar.chart.title_filter', :variable => filter[:name], :value => filter[:answer] )
    end
    title << "<br /> <span class='total_responses'>("
    title << t('root.explore_data.onevar.chart.title_total', :num => total)
    title << ")</span>"
    return title.html_safe
  end 

end
