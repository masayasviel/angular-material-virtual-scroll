require 'json'
require 'securerandom'

File.open("./src/assets/data.json", "w") do |file|
    data = (1..50).map do |i|
        children = []
        if i % 2 == 0 then
            children = (1..10).map do |j|
                c = []
                if j % 2 == 0 then
                    c = (1..5).map do |k|
                        {"id" => SecureRandom.uuid, "name" => "名前#{i}_#{j}_#{k}", "children" => c}
                    end
                end
                {"id" => SecureRandom.uuid, "name" => "名前#{i}_#{j}", "children" => c}
            end
        end
        {"id" => SecureRandom.uuid, "name" => "名前#{i}", "children" => children}
    end

    data[0]["children"] = [
        {
            "id" => SecureRandom.uuid,
            "name" => "名前1_1",
            "children" => [
                {
                    "id" => SecureRandom.uuid,
                    "name" => "名前1_1_1",
                    "children" => [
                        {
                            "id" => SecureRandom.uuid,
                            "name" => "名前1_1_1_1",
                            "children" => []
                        },
                        {
                            "id" => SecureRandom.uuid,
                            "name" => "名前1_1_1_2",
                            "children" => []
                        }
                    ]
                },
                {
                    "id" => SecureRandom.uuid,
                    "name" => "名前1_1_2",
                    "children" => [
                        {
                            "id" => SecureRandom.uuid,
                            "name" => "名前1_1_2_1",
                            "children" => []
                        },
                        {
                            "id" => SecureRandom.uuid,
                            "name" => "名前1_1_2_2",
                            "children" => []
                        }
                    ]
                }
            ]
        },
        {
            "id" => SecureRandom.uuid,
            "name" => "名前1_2",
            "children" => [
                {
                    "id" => SecureRandom.uuid,
                    "name" => "名前1_2_1",
                    "children" => [
                        {
                            "id" => SecureRandom.uuid,
                            "name" => "名前1_2_1_1",
                            "children" => []
                        },
                    ]
                },
                {
                    "id" => SecureRandom.uuid,
                    "name" => "名前1_2_2",
                    "children" => []
                }
            ]
        }
    ]

    JSON.dump(data, file)
end
