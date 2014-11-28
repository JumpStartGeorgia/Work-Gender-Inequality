class AddTypeId < ActiveRecord::Migration
  def change
    rename_column :stories, :discrimination_type, :discrimination_type_id
  end
end
