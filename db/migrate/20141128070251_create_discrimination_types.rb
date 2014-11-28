class CreateDiscriminationTypes < ActiveRecord::Migration
  def up
    create_table :discrimination_types do |t|
      t.integer :sort, :default => 1, :limit => 1

      t.timestamps
    end

    DiscriminationType.create_translation_table! :name => :string
    add_index :discrimination_type_translations, :name
  end

  def down
    drop_table :discrimination_types
    DiscriminationType.drop_translation_table!
  end
end
