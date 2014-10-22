# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20141022114521) do

  create_table "faq_categories", :force => true do |t|
    t.string   "name"
    t.integer  "sort",       :limit => 1
    t.datetime "created_at",              :null => false
    t.datetime "updated_at",              :null => false
  end

  add_index "faq_categories", ["sort"], :name => "index_faq_categories_on_sort"

  create_table "faq_category_translations", :force => true do |t|
    t.integer  "faq_category_id"
    t.string   "locale",          :null => false
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.string   "name"
  end

  add_index "faq_category_translations", ["faq_category_id"], :name => "index_faq_category_translations_on_faq_category_id"
  add_index "faq_category_translations", ["locale"], :name => "index_faq_category_translations_on_locale"
  add_index "faq_category_translations", ["name"], :name => "index_faq_category_translations_on_name"

  create_table "faq_translations", :force => true do |t|
    t.integer  "faq_id"
    t.string   "locale",     :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "question"
    t.text     "answer"
  end

  add_index "faq_translations", ["faq_id"], :name => "index_faq_translations_on_faq_id"
  add_index "faq_translations", ["locale"], :name => "index_faq_translations_on_locale"
  add_index "faq_translations", ["question"], :name => "index_faq_translations_on_question"

  create_table "faqs", :force => true do |t|
    t.integer  "faq_category_id"
    t.integer  "sort",            :limit => 1
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
  end

  add_index "faqs", ["faq_category_id"], :name => "index_faqs_on_faq_category_id"
  add_index "faqs", ["sort"], :name => "index_faqs_on_sort"

  create_table "gap_polls", :force => true do |t|
    t.string   "gender",         :limit => 1
    t.integer  "age",            :limit => 3
    t.string   "category",       :limit => 8
    t.integer  "salary"
    t.string   "interest",       :limit => 8
    t.integer  "saving_percent"
    t.string   "ip",             :limit => 45
    t.string   "country"
    t.string   "city"
    t.decimal  "lat",                          :precision => 15, :scale => 12
    t.decimal  "lon",                          :precision => 15, :scale => 12
    t.string   "platform"
    t.string   "browser"
    t.boolean  "mobile",                                                       :default => false
    t.string   "agent"
    t.datetime "created_at",                                                                      :null => false
    t.datetime "updated_at",                                                                      :null => false
    t.boolean  "finished",                                                     :default => false
  end

  create_table "page_translations", :force => true do |t|
    t.integer  "page_id"
    t.string   "locale",     :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "title"
    t.text     "content"
  end

  add_index "page_translations", ["locale"], :name => "index_page_translations_on_locale"
  add_index "page_translations", ["page_id"], :name => "index_page_translations_on_page_id"

  create_table "pages", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "pages", ["name"], :name => "index_pages_on_name"

  create_table "survey_answers", :force => true do |t|
    t.string   "code",        :limit => 50
    t.integer  "value",       :limit => 2
    t.string   "text",        :limit => 1024
    t.datetime "created_at",                                     :null => false
    t.datetime "updated_at",                                     :null => false
    t.boolean  "can_exclude",                 :default => false
  end

  add_index "survey_answers", ["can_exclude"], :name => "index_survey_answers_on_can_exclude"
  add_index "survey_answers", ["code", "value"], :name => "index_survey_answers_on_code_and_value"
  add_index "survey_answers", ["code"], :name => "index_survey_answers_on_code"

  create_table "survey_questions", :force => true do |t|
    t.string   "code",             :limit => 50
    t.string   "text",             :limit => 1024
    t.boolean  "has_code_answers",                 :default => false
    t.datetime "created_at",                                          :null => false
    t.datetime "updated_at",                                          :null => false
    t.boolean  "is_mappable",                      :default => false
    t.integer  "sort",                             :default => 99
  end

  add_index "survey_questions", ["code", "has_code_answers"], :name => "index_survey_questions_on_code_and_has_code_answers"
  add_index "survey_questions", ["is_mappable"], :name => "index_survey_questions_on_is_mappable"
  add_index "survey_questions", ["sort"], :name => "index_survey_questions_on_sort"
  add_index "survey_questions", ["text"], :name => "index_survey_questions_on_text", :length => {"text"=>255}

  create_table "survey_results", :force => true do |t|
    t.integer  "Interv_code", :limit => 2
    t.integer  "Reg",         :limit => 2
    t.string   "start_time",  :limit => 10
    t.string   "fin_time",    :limit => 10
    t.string   "date",        :limit => 10
    t.integer  "A1",          :limit => 2
    t.integer  "A2",          :limit => 2
    t.integer  "A3",          :limit => 2
    t.integer  "A3.1_1",      :limit => 2
    t.integer  "A3.1_2",      :limit => 2
    t.integer  "A3.1_3",      :limit => 2
    t.integer  "A3.2",        :limit => 2
    t.integer  "A3.3",        :limit => 2
    t.integer  "A4",          :limit => 2
    t.integer  "A4.1",        :limit => 2
    t.integer  "A4.2",        :limit => 2
    t.integer  "A5",          :limit => 2
    t.integer  "A5.1",        :limit => 2
    t.integer  "A6",          :limit => 2
    t.integer  "A7",          :limit => 2
    t.integer  "A8",          :limit => 2
    t.integer  "A9",          :limit => 2
    t.integer  "A10",         :limit => 2
    t.integer  "A11",         :limit => 2
    t.integer  "A12",         :limit => 2
    t.integer  "A13",         :limit => 2
    t.integer  "B1",          :limit => 2
    t.integer  "B1.1",        :limit => 2
    t.integer  "B1.2_1",      :limit => 2
    t.integer  "B1.2_2",      :limit => 2
    t.integer  "B1.2_3",      :limit => 2
    t.integer  "B1.2_4",      :limit => 2
    t.integer  "B1.2_5",      :limit => 2
    t.integer  "B1.2_6",      :limit => 2
    t.integer  "B2",          :limit => 2
    t.integer  "B3",          :limit => 2
    t.integer  "B3.1",        :limit => 2
    t.integer  "B3.2_1",      :limit => 2
    t.integer  "B3.2_2",      :limit => 2
    t.integer  "B3.2_3",      :limit => 2
    t.integer  "B3.2_4",      :limit => 2
    t.integer  "B3.2_5",      :limit => 2
    t.integer  "B3.2_6",      :limit => 2
    t.integer  "B3.2_7",      :limit => 2
    t.integer  "B3.2_8",      :limit => 2
    t.integer  "B3.2_9",      :limit => 2
    t.integer  "B3.2_10",     :limit => 2
    t.integer  "B3.2_11",     :limit => 2
    t.integer  "B3.2_12",     :limit => 2
    t.integer  "B3.2_13",     :limit => 2
    t.integer  "B3.2_14",     :limit => 2
    t.integer  "B3.3_1",      :limit => 2
    t.integer  "B3.3_2",      :limit => 2
    t.integer  "B3.3_3",      :limit => 2
    t.integer  "B3.3_4",      :limit => 2
    t.integer  "B3.3_5",      :limit => 2
    t.integer  "B3.3_6",      :limit => 2
    t.integer  "B3.3_7",      :limit => 2
    t.integer  "B3.3_8",      :limit => 2
    t.integer  "B3.3_9",      :limit => 2
    t.integer  "B3.3_10",     :limit => 2
    t.integer  "B3.3_11",     :limit => 2
    t.integer  "B3.3_12",     :limit => 2
    t.integer  "B3.3_13",     :limit => 2
    t.integer  "B3.3_14",     :limit => 2
    t.integer  "B4",          :limit => 2
    t.integer  "B4.1_1",      :limit => 2
    t.integer  "B4.1_2",      :limit => 2
    t.integer  "B4.1_3",      :limit => 2
    t.integer  "B4.1_4",      :limit => 2
    t.integer  "B5_1",        :limit => 2
    t.integer  "B5_2",        :limit => 2
    t.integer  "B5_3",        :limit => 2
    t.integer  "B5_4",        :limit => 2
    t.integer  "B5_5",        :limit => 2
    t.integer  "B6_1",        :limit => 2
    t.integer  "B6_2",        :limit => 2
    t.integer  "B6_3",        :limit => 2
    t.integer  "B6_4",        :limit => 2
    t.integer  "B6_5",        :limit => 2
    t.integer  "B6_6",        :limit => 2
    t.integer  "C1",          :limit => 2
    t.integer  "C1.1",        :limit => 2
    t.integer  "C1.2",        :limit => 2
    t.integer  "C1.3",        :limit => 2
    t.integer  "C1.3.1_1",    :limit => 2
    t.integer  "C1.3.1_2",    :limit => 2
    t.integer  "C1.3.1_3",    :limit => 2
    t.integer  "C1.3.1_4",    :limit => 2
    t.integer  "C1.3.1_5",    :limit => 2
    t.integer  "C1.3.1_6",    :limit => 2
    t.integer  "C1.3.1_7",    :limit => 2
    t.integer  "C1.3.1_8",    :limit => 2
    t.integer  "C1.3.1_9",    :limit => 2
    t.integer  "C1.3.1_10",   :limit => 2
    t.integer  "C1.3.1_11",   :limit => 2
    t.integer  "C1.3.2_1",    :limit => 2
    t.integer  "C1.3.2_2",    :limit => 2
    t.integer  "C1.3.2_3",    :limit => 2
    t.integer  "C1.3.2_4",    :limit => 2
    t.integer  "C1.3.2_5",    :limit => 2
    t.integer  "C2",          :limit => 2
    t.integer  "C3",          :limit => 2
    t.integer  "C3.1",        :limit => 2
    t.integer  "C3.2",        :limit => 2
    t.integer  "C4",          :limit => 2
    t.integer  "C4.1",        :limit => 2
    t.integer  "C4.1.1",      :limit => 2
    t.integer  "C4.2",        :limit => 2
    t.integer  "D1",          :limit => 2
    t.integer  "D1.1",        :limit => 2
    t.integer  "D1.2",        :limit => 2
    t.integer  "D1.3",        :limit => 2
    t.integer  "D1.3.1_1",    :limit => 2
    t.integer  "D1.3.1_2",    :limit => 2
    t.integer  "D1.3.1_3",    :limit => 2
    t.integer  "D1.3.1_4",    :limit => 2
    t.integer  "D1.3.1_5",    :limit => 2
    t.integer  "D1.3.1_6",    :limit => 2
    t.integer  "D1.3.1_7",    :limit => 2
    t.integer  "D1.3.1_8",    :limit => 2
    t.integer  "D1.3.1_9",    :limit => 2
    t.integer  "D1.3.1_10",   :limit => 2
    t.integer  "D1.3.1_11",   :limit => 2
    t.integer  "D1.3.1_12",   :limit => 2
    t.integer  "D1.3.2",      :limit => 2
    t.integer  "D1.3.3_1",    :limit => 2
    t.integer  "D1.3.3_2",    :limit => 2
    t.integer  "D1.3.3_3",    :limit => 2
    t.integer  "D1.3.3_4",    :limit => 2
    t.integer  "D1.3.3_5",    :limit => 2
    t.integer  "D1.3.3_6",    :limit => 2
    t.integer  "D1.3.3_7",    :limit => 2
    t.integer  "D1.3.3_8",    :limit => 2
    t.integer  "D1.3.3_9",    :limit => 2
    t.integer  "D1.3.3_10",   :limit => 2
    t.integer  "D1.3.3_11",   :limit => 2
    t.integer  "D1.3.3_12",   :limit => 2
    t.integer  "D1.4",        :limit => 2
    t.integer  "D2",          :limit => 2
    t.integer  "E1",          :limit => 2
    t.integer  "E1.1_1",      :limit => 2
    t.integer  "E1.1_2",      :limit => 2
    t.integer  "E1.1_3",      :limit => 2
    t.integer  "E1.1_4",      :limit => 2
    t.integer  "E1.1_5",      :limit => 2
    t.integer  "E1.1_6",      :limit => 2
    t.integer  "E1.1_7",      :limit => 2
    t.integer  "E1.1_8",      :limit => 2
    t.integer  "E1.1_9",      :limit => 2
    t.integer  "E1.1_10",     :limit => 2
    t.integer  "E1.1_11",     :limit => 2
    t.integer  "E1.1_12",     :limit => 2
    t.integer  "E2_1",        :limit => 2
    t.integer  "E2_2",        :limit => 2
    t.integer  "E3_1",        :limit => 2
    t.integer  "E3_2",        :limit => 2
    t.integer  "E3_3",        :limit => 2
    t.integer  "E3_4",        :limit => 2
    t.integer  "E3_5",        :limit => 2
    t.integer  "E3_6",        :limit => 2
    t.integer  "E3_7",        :limit => 2
    t.integer  "F1_1",        :limit => 2
    t.integer  "F1_2",        :limit => 2
    t.integer  "F2_1",        :limit => 2
    t.integer  "F2_2",        :limit => 2
    t.integer  "F2_3",        :limit => 2
    t.integer  "F2_4",        :limit => 2
    t.integer  "F2_5",        :limit => 2
    t.integer  "F2_6",        :limit => 2
    t.integer  "F2_7",        :limit => 2
    t.integer  "F2_8",        :limit => 2
    t.integer  "F3",          :limit => 2
    t.integer  "F3.1",        :limit => 2
    t.integer  "F4",          :limit => 2
    t.integer  "G1_1",        :limit => 2
    t.integer  "G1_2",        :limit => 2
    t.integer  "G1_3",        :limit => 2
    t.integer  "G1_4",        :limit => 2
    t.integer  "G1_5",        :limit => 2
    t.integer  "G2",          :limit => 2
    t.integer  "G3",          :limit => 2
    t.integer  "G4_1",        :limit => 2
    t.integer  "G4_2",        :limit => 2
    t.integer  "G4_3",        :limit => 2
    t.integer  "G4_4",        :limit => 2
    t.integer  "G4_5",        :limit => 2
    t.integer  "G4_6",        :limit => 2
    t.integer  "G4_7",        :limit => 2
    t.integer  "G4_8",        :limit => 2
    t.integer  "G4_9",        :limit => 2
    t.integer  "G4_10",       :limit => 2
    t.integer  "G4_11",       :limit => 2
    t.integer  "G4_12",       :limit => 2
    t.integer  "G4_13",       :limit => 2
    t.integer  "G4_14",       :limit => 2
    t.integer  "G4_15",       :limit => 2
    t.integer  "G4_16",       :limit => 2
    t.integer  "G5_1",        :limit => 2
    t.integer  "G5_2",        :limit => 2
    t.integer  "G5_3",        :limit => 2
    t.integer  "G5_4",        :limit => 2
    t.integer  "G5_5",        :limit => 2
    t.integer  "G5_6",        :limit => 2
    t.integer  "G5_7",        :limit => 2
    t.integer  "G5_8",        :limit => 2
    t.integer  "G5_9",        :limit => 2
    t.integer  "G6",          :limit => 2
    t.integer  "G7_1",        :limit => 2
    t.integer  "G7_2",        :limit => 2
    t.integer  "G7_3",        :limit => 2
    t.integer  "G7_4",        :limit => 2
    t.integer  "G7_5",        :limit => 2
    t.integer  "G7_6",        :limit => 2
    t.integer  "G7_7",        :limit => 2
    t.integer  "G7_8",        :limit => 2
    t.integer  "G7_9",        :limit => 2
    t.integer  "G7_10",       :limit => 2
    t.integer  "G7_11",       :limit => 2
    t.integer  "G7_12",       :limit => 2
    t.integer  "G7_13",       :limit => 2
    t.integer  "G7_14",       :limit => 2
    t.integer  "G7_15",       :limit => 2
    t.integer  "G7_16",       :limit => 2
    t.integer  "G8",          :limit => 2
    t.integer  "G8.1",        :limit => 2
    t.integer  "G8.2",        :limit => 2
    t.integer  "G8.3",        :limit => 2
    t.integer  "G8.3.1_1",    :limit => 2
    t.integer  "G8.3.1_2",    :limit => 2
    t.integer  "G8.3.1_3",    :limit => 2
    t.integer  "G8.3.1_4",    :limit => 2
    t.integer  "G8.3.1_5",    :limit => 2
    t.integer  "G8.3.1_6",    :limit => 2
    t.integer  "G8.3.1_7",    :limit => 2
    t.integer  "G8.3.1_8",    :limit => 2
    t.integer  "G8.3.2_1",    :limit => 2
    t.integer  "G8.3.2_2",    :limit => 2
    t.integer  "G8.3.2_3",    :limit => 2
    t.integer  "G8.3.2_4",    :limit => 2
    t.integer  "G8.3.2_5",    :limit => 2
    t.integer  "G8.4_1",      :limit => 2
    t.integer  "G8.4_2",      :limit => 2
    t.integer  "G8.4_3",      :limit => 2
    t.integer  "G8.4_4",      :limit => 2
    t.integer  "G8.4_5",      :limit => 2
    t.integer  "G8.4_6",      :limit => 2
    t.integer  "G8.4_7",      :limit => 2
    t.integer  "G8.4_8",      :limit => 2
    t.integer  "G8.4_9",      :limit => 2
    t.integer  "G8.4_10",     :limit => 2
    t.integer  "G8.4_11",     :limit => 2
    t.integer  "H1",          :limit => 2
    t.integer  "H2",          :limit => 2
    t.integer  "H3",          :limit => 2
    t.integer  "H4_1",        :limit => 2
    t.integer  "H4_2",        :limit => 2
    t.integer  "H4.1",        :limit => 2
    t.integer  "H5",          :limit => 2
    t.integer  "H6",          :limit => 2
    t.integer  "H7",          :limit => 2
    t.integer  "H8",          :limit => 2
    t.integer  "H9",          :limit => 2
    t.integer  "H10_1",       :limit => 2
    t.integer  "H10_2",       :limit => 2
    t.integer  "H10_3",       :limit => 2
    t.integer  "H10_4",       :limit => 2
    t.integer  "Envelope",    :limit => 2
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.integer  "role",                   :default => 0,  :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "provider"
    t.string   "uid"
    t.string   "nickname"
    t.string   "avatar"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["provider", "uid"], :name => "idx_users_provider"
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
