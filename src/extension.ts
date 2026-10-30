import * as vscode from 'vscode';

// Функция активации расширения
export function activate(context: vscode.ExtensionContext) {

    // Регистрация команды анализа C++
    const command = vscode.commands.registerCommand(
        'condition-counter.analyze',
        () => {

            // Получение активного редактора
            const editor = vscode.window.activeTextEditor;

            // Проверка, открыт ли файл
            if (!editor) {
                return;
            }

            // Получение информации о файле
            const document = editor.document;
            const file = document.fileName;

            // Проверка расширения файла
            if (!/\.(cpp|cc|cxx|h|hpp|hh|hxx)$/i.test(file)) {
                return;
            }

            // Получение исходного кода
            const code = document.getText();

            // Подсчёт всех операторов if
            const ifCount = (
                code.match(/\bif\s*\(/g) || []
            ).length;

            // Подсчёт операторов else if
            const elseIfCount = (
                code.match(/\belse\s+if\s*\(/g) || []
            ).length;

            // Создание панели для вывода результатов
            const output = vscode.window.createOutputChannel(
                'Condition Counter'
            );

            // Вывод результатов анализа
            output.clear();
            output.appendLine(`Файл: ${file.split(/[\\/]/).pop()}`);
            output.appendLine(`if: ${ifCount - elseIfCount}`);
            output.appendLine(`else if: ${elseIfCount}`);
            output.appendLine(`Всего: ${ifCount}`);
            output.show();

            // Добавление панели в список ресурсов расширения
            context.subscriptions.push(output);
        }
    );

    // Добавление команды в список ресурсов расширения
    context.subscriptions.push(command);
}

// Функция деактивации расширения
export function deactivate() {}