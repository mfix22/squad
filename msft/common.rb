def process_line(str)
  words = str.split(" ")
  first_word = words.pop
  chars = first_word.split("")
  words.each do |word|
    chars = chars & word.split("")
  end
  chars.sort.join("")
end

ARGF.each_with_index do |line,idx|
  if idx == 0
  else
    puts process_line(line)
  end
end
