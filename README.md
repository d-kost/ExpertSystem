## Expert System

### Knowledge base

Knowledge base consists of _rule : result_ pairs. Each _result_ has a type and depends on it.

### Algorithm

1. Ask a question and get an answer

2. Find the rule that depend on this question

3. Check other conditions of the rule, ask questions if necessary. All new answers will be remembered

4. If the rule is true then take its result. Else go to step 2 while the rules exist

5. If there are no true rules then knowledge base is not complete