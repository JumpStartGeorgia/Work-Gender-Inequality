class RootController < ApplicationController

  def index

    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def faq
    @faq_categories = FaqCategory.sorted
    @faqs = Faq.sorted

    # add the required assets
    @css.push("faqs.css")
    @js.push("faqs.js")

    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def explore_data
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

    respond_to do |format|
      format.html{
        # flag so leaflet js is loaded
        @use_map = true

        # add the required assets
        @css.push("explore_data.css")
        @js.push("explore_data.js")

        # record url for making ajax call
        gon.explore_data_ajax_path = explore_data_path(:format => :js)
        gon.hover_region = I18n.t('root.explore_data.hover_region')
        gon.na = I18n.t('root.explore_data.na')
      } 
      format.js{
        # get the data
        options = {}
        options[:filter] = @filter if @filter.present?
        options[:exclude_dkra] = params[:exclude_dkra].to_bool if params[:exclude_dkra].present?

        # if @col has data, then this is a crosstab,
        # else this is just a single variable lookup
        if @col.present?
          @data = SurveyResult.crosstab_count(@row, @col, options)
          @data[:title] = build_crosstab_chart_title(@data[:row_question], @data[:column_question], @filter, @data[:total_responses])
        else
          @data = SurveyResult.onevar_count(@row, options)
          @data[:title] = build_onevar_chart_title(@data[:row_question], @filter, @data[:total_responses])
        end

#        logger.debug "/////////////////////////// #{@data}"

        status = @data.present? ? :ok : :unprocessable_entity
        render json: @data.to_json, status: :ok

      }
    end

  end
  

private

  def build_crosstab_chart_title(row, col, filter, total)
    title = t('root.explore_data.crosstab.title', :row => row, :col => col)
    if filter.present?
      title << t('root.explore_data.crosstab.title_filter', :variable => filter[:name], :value => filter[:answer] )
    end
    title << "<br /> <span class='total_responses'>("
    title << t('root.explore_data.crosstab.title_total', :num => total)
    title << ")</span>"
    return title.html_safe
  end 

  def build_onevar_chart_title(row, filter, total)
    title = t('root.explore_data.onevar.title', :row => row)
    if filter.present?
      title << t('root.explore_data.onevar.title_filter', :variable => filter[:name], :value => filter[:answer] )
    end
    title << "<br /> <span class='total_responses'>("
    title << t('root.explore_data.onevar.title_total', :num => total)
    title << ")</span>"
    return title.html_safe
  end 

end
